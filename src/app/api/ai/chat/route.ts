import { NextResponse } from "next/server";
import { queryGroqAi } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { prompt, systemPrompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const aiResponse = await queryGroqAi(prompt, systemPrompt);
    return NextResponse.json({ result: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: "Failed to query Groq AI" }, { status: 500 });
  }
}
