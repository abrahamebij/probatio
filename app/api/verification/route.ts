import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { runVerificationPipeline } from "@/lib/ai/orchestrator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claimId } = body;

    if (!claimId) {
      return NextResponse.json({ error: "Missing claimId" }, { status: 400 });
    }

    const claim = db.getClaimById(claimId);
    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    // Set claim status to verifying
    db.updateClaimStatus(claim.id, "verifying");

    const evidence = db.getEvidenceForClaim(claim.id);
    const verification = await runVerificationPipeline(claim, evidence);

    return NextResponse.json({ verification });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute verification pipeline" }, { status: 500 });
  }
}
