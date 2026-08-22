import { NextRequest, NextResponse } from "next/server";
import { ApplicationRepository } from "@/lib/repositories/applicationRepository";
import { generateGroundedAnswer } from "@/lib/ai/groundingEngine";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const query = body.question || body.query;
    const applicationId = body.applicationId;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "A valid citizen question string is required." },
        { status: 400 }
      );
    }

    let application = null;
    if (applicationId && typeof applicationId === "string") {
      application = await ApplicationRepository.getApplication(applicationId);
    }

    const groundedResult = await generateGroundedAnswer(query.trim(), application);

    return NextResponse.json({
      success: true,
      data: groundedResult,
    });
  } catch (error) {
    console.error("API error in POST /api/ai/ask:", error);
    return NextResponse.json(
      { success: false, error: "Unable to process citizen AI inquiry at this time." },
      { status: 500 }
    );
  }
}
