import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  const disputes = db.getDisputes();
  return NextResponse.json({ disputes });
}
