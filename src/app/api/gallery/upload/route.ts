import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const category = (formData.get("category") as string) || "nursery";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "gallery");
    await mkdir(uploadDir, { recursive: true });

    const uploadedItems = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) continue;

      const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
      if (!isImage && !isVideo) continue;

      const ext = path.extname(file.name) || (isImage ? ".jpg" : ".mp4");
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);

      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      const newItem = {
        id: `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        src: `/images/gallery/${uniqueName}`,
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        category,
        width: isImage ? 800 : 1280,
        height: isImage ? 600 : 720,
        type: (isImage ? "image" : "video") as "image" | "video",
      };

      uploadedItems.push(newItem);
    }

    if (uploadedItems.length > 0) {
      const galleryPath = path.join(process.cwd(), "src", "data", "gallery.ts");
      let content = await readFile(galleryPath, "utf-8");

      const closingIndex = content.lastIndexOf("];");
      if (closingIndex !== -1) {
        const lines = uploadedItems.map((item) => {
          return `  { id: "${item.id}", src: "${item.src}", alt: "${item.alt}", category: "${item.category}", width: ${item.width}, height: ${item.height}, type: "${item.type}" },`;
        });
        content = content.slice(0, closingIndex) + lines.join("\n") + "\n];\n";
        await writeFile(galleryPath, content, "utf-8");
      }
    }

    return NextResponse.json({
      success: true,
      count: uploadedItems.length,
      items: uploadedItems,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
