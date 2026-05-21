import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = await params;
  const postId = parseInt(id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid Post Id" }, { status: 400 });
  }

  const Post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,

      comments: {
        include: {
          author: true,
        },
      },
      likes: true,
    },
  });
  if (!Post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const fullPost = {
    ...Post,
    stats: {
      commentCount: Post.comments.length,
      likeCount: Post.likes.length,
      wordCount: Post.content.split(" ").length,
      readingTime: Math.ceil(Post.content.split(" ").length / 200),
    },
  };
  return NextResponse.json(fullPost);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Id invalid" }, { status: 400 });
    }

    const body = await request.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...body,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    NextResponse.json(
      {
        error: "Something Went Wrong",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const postId = parseInt(params.id);
  if (isNaN(postId)) {
    return NextResponse.json(
      {
        error: "Post Not Found",
      },
      { status: 400 },
    );
  }
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return NextResponse.json({
    message: "Post deleted Successfully",
    status: 204,
  });
}
