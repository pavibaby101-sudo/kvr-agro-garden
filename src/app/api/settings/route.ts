import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";

export interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  businessHours: string;
  metaTitle: string;
  metaDescription: string;
}

export async function GET() {
  const settings = readJSON<SettingsData>("settings.json");
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentSettings = readJSON<SettingsData>("settings.json");
    const allowedFields: Record<string, string> = {};
    const validKeys = ["siteName", "siteDescription", "contactEmail", "contactPhone", "address", "facebook", "instagram", "youtube", "whatsapp", "businessHours", "metaTitle", "metaDescription"];
    for (const key of validKeys) {
      if (key in body) {
        allowedFields[key] = String(body[key]);
      }
    }
    const updatedSettings = { ...currentSettings, ...allowedFields };
    writeJSON("settings.json", updatedSettings);
    return NextResponse.json({ settings: updatedSettings });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
