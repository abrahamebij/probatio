import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { hashEvidenceContent, combineEvidenceHashes } from "@/lib/evidence/hashing";

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

    const evidenceList = db.getEvidenceForClaim(claim.id);
    const evidenceHashes = evidenceList.map((e) => e.hash);
    const combinedEvHash = combineEvidenceHashes(evidenceHashes.length > 0 ? evidenceHashes : ["0x00"]);
    const claimHash = hashEvidenceContent(claim.claimText);

    const attestation = db.createAttestation({
      claimId: claim.id,
      assetId: claim.assetId,
      claimHash,
      evidenceHash: combinedEvHash,
      confidence: claim.confidence || 91,
      status: "active",
    });

    return NextResponse.json({ attestation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create attestation stub" }, { status: 500 });
  }
}
