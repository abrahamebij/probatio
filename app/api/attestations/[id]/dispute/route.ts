import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reason, evidenceProvided } = body;

    if (!reason) {
      return NextResponse.json({ error: "Missing dispute reason" }, { status: 400 });
    }

    const attestation = db.getAttestation(id);
    if (!attestation) {
      return NextResponse.json({ error: "Attestation not found" }, { status: 404 });
    }

    const dispute = db.createDispute({
      attestationId: attestation.id,
      claimId: attestation.claimId,
      reason,
      evidenceProvided: evidenceProvided || [],
      status: "under_review",
    });

    return NextResponse.json({ dispute }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit dispute" }, { status: 500 });
  }
}
