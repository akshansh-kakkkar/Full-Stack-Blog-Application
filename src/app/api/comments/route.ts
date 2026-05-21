import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const postId = searchParams.get("postId");
  const limit = searchParams.get("limit");
  const parsedLimit = limit ? parseInt(limit) : undefined;
  const comments = await prisma.comment.findMany({
    where: {
      ...(authorId && {
        authorId: parseInt(authorId),
      }),
      ...(postId && { postId: parseInt(postId) }),
    },
      include : {
    author : true,
    post : true    
  },
  orderBy : {
    createdAt : "desc"
  },
  ...(parsedLimit && {
    take : parsedLimit
  })

  })
  return NextResponse.json({
    total : comments.length,
    comments
  })
}
