import { NextRequest, NextResponse } from "next/server";
import { chatWithGroq, type ChatMessage } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let chatMessages: ChatMessage[] = [];

    if (body.message && typeof body.message === "string") {
      chatMessages = [{ role: "user", content: body.message }];
    } else if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
      chatMessages = body.messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" as const : "user" as const,
        content: m.content,
      }));
    } else {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const reply = await chatWithGroq(chatMessages);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
