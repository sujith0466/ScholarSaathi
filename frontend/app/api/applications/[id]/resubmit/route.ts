import { NextRequest, NextResponse } from "next/server";
import { ApplicationRepository } from "@/lib/repositories/applicationRepository";
import { resolveJourneyState } from "@/domain/resolver";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing application ID." },
        { status: 400 }
      );
    }

    const currentApp = await ApplicationRepository.getApplication(id);
    if (!currentApp) {
      return NextResponse.json(
        { success: false, error: `Application ${id} not found.` },
        { status: 404 }
      );
    }

    // Guard: Only applications in DEFECTIVE_INSTITUTE can be resubmitted
    if (currentApp.currentState !== "DEFECTIVE_INSTITUTE") {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot resubmit: Application is currently in state '${currentApp.currentState}'. Only DEFECTIVE_INSTITUTE applications can accept corrections.`,
        },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const {
      fileName = "Priya_Bonafide_Stamped_Verified.pdf",
      fileUrl = "/synthetic/bonafide_valid.png",
      isSealVerified = true,
    } = body;

    // Deterministic synthetic validation rule
    if (isSealVerified === false || fileName.toLowerCase().includes("defective") || fileName.toLowerCase().includes("unstamped")) {
      return NextResponse.json(
        {
          success: false,
          error: "Document validation failed: The uploaded Bonafide Certificate is missing the required Principal circular seal.",
        },
        { status: 422 }
      );
    }

    const updatedApp = await ApplicationRepository.resubmitApplication(id, {
      fileName,
      fileUrl,
    });

    if (!updatedApp) {
      return NextResponse.json(
        { success: false, error: "Application correction was already submitted or could not be safely applied." },
        { status: 409 }
      );
    }

    const journey = resolveJourneyState(updatedApp);

    return NextResponse.json({
      success: true,
      message: "Application successfully corrected and re-submitted to College Nodal Officer.",
      data: {
        application: updatedApp,
        journey,
      },
    });
  } catch (error) {
    console.error("API error in POST /api/applications/[id]/resubmit:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during resubmission processing." },
      { status: 500 }
    );
  }
}
