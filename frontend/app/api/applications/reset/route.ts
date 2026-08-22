import { NextResponse } from "next/server";
import { ApplicationRepository } from "@/lib/repositories/applicationRepository";

export async function POST() {
  try {
    await ApplicationRepository.resetApplications();
    return NextResponse.json({
      success: true,
      message: "Applications successfully reset to demo seed state.",
    });
  } catch (error) {
    console.error("API error in POST /api/applications/reset:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset applications" },
      { status: 500 }
    );
  }
}
