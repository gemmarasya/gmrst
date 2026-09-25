import { NextResponse } from "next/server";
import { memories as contentMemories } from "@/data/content";

export async function GET() {
  return NextResponse.json(contentMemories);
}

