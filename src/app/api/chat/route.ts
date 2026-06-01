import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }
    const response = await getChatResponse(messages);
    return NextResponse.json({ response });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to .env.local" },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}
