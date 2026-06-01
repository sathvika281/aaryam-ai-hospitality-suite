import { NextRequest, NextResponse } from "next/server";
import { getPackageRecommendation } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = await getPackageRecommendation(body);
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleaned);
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: "API key not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
