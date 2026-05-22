import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const { postId: postIdStr } = await params;
  const postId = parseInt(postIdStr);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Not Found" }, { status: 400 });
  }

  const Post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!Post) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({
    postId: Post.id,
    postTitle: Post.title,
    totalComments: Post.comments.length,
    comments: Post.comments,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId: postIdStr } = await params;
    const postId = parseInt(postIdStr);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid Post" }, { status: 400 });
    }

    const body = await request.json();
    if (!body.content) {
      return NextResponse.json(
        { error: "Content and authorId are required" },
        { status: 400 },
      );
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    
    if (!existingPost) {
      return NextResponse.json(
        {
          error: "Post not found",
        },
        {
          status: 404,
        },
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        content: body.content,
        postId,
        authorId: session.user.id,
      },
      include: {
        author: true,
        post: true,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went wrong" },
      { status: 400 },
    );
  }
}
