import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  const claims = db.getClaims();
  return NextResponse.json({ claims });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assetId, claimText } = body;

    if (!assetId || !claimText) {
      return NextResponse.json({ error: "Missing assetId or claimText" }, { status: 400 });
    }

    const newClaim = db.createClaim({
      assetId,
      claimText,
      status: "pending",
      confidence: null,
    });

    return NextResponse.json({ claim: newClaim }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create claim" }, { status: 500 });
  }
}
