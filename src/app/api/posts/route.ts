import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    
      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },
    
  });
  const totalPosts = await prisma.post.count();
  return NextResponse.json({
    posts, 
    pagenation : {
        currentPage : page,
        totalPosts,
        totalPages : Math.ceil(totalPosts/limit)
    }
  })
}
