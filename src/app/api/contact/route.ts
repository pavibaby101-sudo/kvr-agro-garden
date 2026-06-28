import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";

export interface MessageData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const messages = readJSON<MessageData[]>("messages.json");
    const newMessage: MessageData = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...parsed.data,
      createdAt: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);
    writeJSON("messages.json", messages);

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  const messages = readJSON<MessageData[]>("messages.json");
  return NextResponse.json({ messages });
}
