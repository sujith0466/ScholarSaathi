import { NextRequest, NextResponse } from "next/server";
import { ApplicationRepository } from "@/lib/repositories/applicationRepository";
import { resolveJourneyState } from "@/domain/resolver";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const application = await ApplicationRepository.getApplication(id);

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    const journey = resolveJourneyState(application);

    return NextResponse.json({
      success: true,
      data: {
        application,
        journey,
      },
    });
  } catch (error) {
    console.error("API error in GET /api/applications/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
