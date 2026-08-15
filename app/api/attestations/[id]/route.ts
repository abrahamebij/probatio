import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const attestation = db.getAttestation(id);

  if (!attestation) {
    return NextResponse.json({ error: "Attestation not found" }, { status: 404 });
  }

  const claim = db.getClaimById(attestation.claimId);
  const evidence = claim ? db.getEvidenceForClaim(claim.id) : [];

  return NextResponse.json({ attestation, claim, evidence });
}
