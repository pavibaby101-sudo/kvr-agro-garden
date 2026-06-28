import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { hatcheryFormSchema } from "@/lib/validations";
import { EnquiryData } from "../landscaping/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = hatcheryFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const enquiries = readJSON<EnquiryData[]>("enquiries.json");
    const newEnquiry: EnquiryData = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: "hatchery",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      details: {
        service: parsed.data.service,
        quantity: String(parsed.data.quantity),
        description: parsed.data.description,
      },
      createdAt: new Date().toISOString(),
    };

    enquiries.push(newEnquiry);
    writeJSON("enquiries.json", enquiries);

    return NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
