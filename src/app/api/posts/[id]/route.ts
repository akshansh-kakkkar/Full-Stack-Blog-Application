import { comment, post, users } from "@/app/data/mockData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise <{id : string}> },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const {id} = await params;
  const postId = parseInt(id);
  const posts = post.find((p) => p.id === postId);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid Post Id" }, { status: 400 });
  }
  if (!posts) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const author = users.find((user) => user.id === posts.authorId);
  const postComments = comment
    .filter((comment) => comment.postId === postId)
    .map((comment) => ({
      ...comment,
      author: users.find((user) => user.id === comment.authorId),
    }));
  const fullPost = {
    ...posts,

    author,
    comment: postComments,
    stats: {
      commentCount: postComments,
      wordCount: posts.content.split("").length,
      readingTime: Math.ceil(posts.content.split("").length / 200),
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
    const postIndex = post.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const body = await request.json();
    const updated = {
      ...post[postIndex],
      ...body,
      id: postId,
      updatedAt: new Date().toISOString(),
    };
    post[postIndex] = updated;
    const author = users.find((user) => user.id === updated.authorId);
    return NextResponse.json({
      ...updated,
      author,
    });
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
      { status: 404 },
    );
  }
  const postIndex = post.findIndex(p=> p.id === postId);
  if(postIndex === -1){
    return NextResponse.json(
        {error:"Post Not Found"}, {status : 404}
    )
  }
  const deletePost = post.splice(postIndex, 1)[0]
  const deleteComments = comment.filter(c => c.postId === postId);
  for(let i = deleteComments.length -1; i>0 ; i--){
    if(comment[i].postId === postId){
        comment.splice(i,1);
    }
  }
  return NextResponse.json({
    message : "Post deleted Successfully", post:deletePost,
    status:204
  })
}
