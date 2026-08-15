import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { hashEvidenceContent } from "@/lib/evidence/hashing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claimId, type, source, rawContent } = body;

    if (!claimId || !type || !source) {
      return NextResponse.json({ error: "Missing required fields (claimId, type, source)" }, { status: 400 });
    }

    const contentToHash = rawContent || `${claimId}:${type}:${source}:${Date.now()}`;
    const hash = hashEvidenceContent(contentToHash);

    const evidence = db.addEvidence({
      claimId,
      type,
      source,
      hash,
    });

    return NextResponse.json({ evidence }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add evidence" }, { status: 500 });
  }
}
