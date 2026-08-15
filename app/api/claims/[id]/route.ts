import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const claim = db.getClaimById(id);

  if (!claim) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  const evidence = db.getEvidenceForClaim(claim.id);
  const verification = db.getVerification(claim.id);
  const attestation = db.getAttestation(claim.id);

  return NextResponse.json({ claim, evidence, verification, attestation });
}
