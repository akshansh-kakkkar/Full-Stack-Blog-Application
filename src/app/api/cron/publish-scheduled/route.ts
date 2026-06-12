import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    const duePosts = await prisma.post.updateMany({
      where: {
        status: "SCHEDULED",
        ScheduledAt: {
          lte: now,
        },
      },
      data: {
        status: "PUBLISHED",
        publishedAt: now,
      },
    });

    return NextResponse.json({
      updated : duePosts.count
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Cron job failed" },
      { status: 500 },
    );
  }
}
