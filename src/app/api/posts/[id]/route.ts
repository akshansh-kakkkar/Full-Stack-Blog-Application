import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { updatePostSchema } from "../../validators/post";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong with fetching the posts" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Id invalid" }, { status: 400 });
    }

    const body = await request.json();
    const validation = updatePostSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json({error : validation.error.flatten()}, {status : 400})
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!existingPost) {
      return NextResponse.json(
        {
          error: "Post Not Found",
        },
        { status: 404 },
      );
    }
    if (existingPost.authorId !== Number(session.user.id)) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        { status: 403 },
      );
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: validation.data.title,
        content: validation.data.content,
        image: validation.data.image,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something Went Wrong while updating the posts.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        {
          error: "Post Not Found",
        },
        { status: 404 },
      );
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (existingPost.authorId !== Number(session.user.id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while deleting the post." },
      { status: 500 },
    );
  }
}
