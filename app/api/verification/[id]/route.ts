import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const verification = db.getVerification(id);

  if (!verification) {
    return NextResponse.json({ error: "Verification not found" }, { status: 404 });
  }

  return NextResponse.json({ verification });
}
