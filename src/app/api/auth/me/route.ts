import { NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ user });
}
