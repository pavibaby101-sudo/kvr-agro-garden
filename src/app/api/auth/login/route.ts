import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readJSON } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const admins = readJSON<AdminUser[]>("admins.json");
    const admin = admins.find((a) => a.email === email);

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
