import { Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users = await Prisma.user.findMany({
    include : {
        posts : {
            include : {
                comments : true, 
                likes : true
            }
        },
        comments : true,
        likes   : true
    }
  })
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and Email is required" },
        { status: 400 },
      );
    }
    const existingUser =await Prisma.user.findUnique({
        where : {
            email : body.email
        }
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 },
      );
    }
    const newUser = await Prisma.user.create({
        data : {
            name : body.name,
            email : body.email
        }
    })
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 },
    );
  }
}
