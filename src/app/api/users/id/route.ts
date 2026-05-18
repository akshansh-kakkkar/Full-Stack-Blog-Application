import { NextResponse } from "next/server";
import { users, post, comment } from "@/app/data/mockData";

import { error } from "console";
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userId = parseInt(params.id);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }
  const User = users.find((u) => (u.id = userId));
  if (!User) {
    return NextResponse.json("User not found", { status: 404 });
  }
  const postsByUsers = post.filter((post) => post.authorId === userId);
  const userComments = comment.filter((c) => c.authorId === userId);
  const userDetails = {
    ...users,
    posts: postsByUsers,
    comment: userComments,
    stats: {
      totalPosts: postsByUsers.length,
      totalComments: userComments.length,
    },
  };
  return NextResponse.json(userDetails);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user Id" }, { status: 400 });
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await request.json();
    const updateUser = {
      ...users[userIndex],
      ...body,
      id: userId,
    };
    users[userIndex] = updateUser;
    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 },
    );
  }
}
