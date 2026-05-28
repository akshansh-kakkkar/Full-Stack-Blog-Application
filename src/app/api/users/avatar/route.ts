import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    if (!body.image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }
    const base64 = Buffer.byteLength(body.image, "base64") / (1024 * 1024);
    if (base64 < 2) {
      return NextResponse.json(
        { message: "Image size exceeds 2mb" },
        { status: 400 },
      );
    }
    const uploadResponse = await cloudinary.uploader.upload(body.image, {
      folder: "avatars",
      allowed_formats: ["png", "jpg", "jpeg", "webp", "svg", "gif"],
      transformation: [
        {
          width: 400,
          height: 400,
          crop: "fill",
        },
      ],
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: uploadResponse.secure_url,
      },
    });
    return NextResponse.json(
      {
        message: "Image uploaded successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
