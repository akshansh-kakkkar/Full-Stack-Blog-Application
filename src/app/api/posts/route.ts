import {post, users} from "@/app/data/mockData";
import { NextResponse } from "next/server";
export async function GET() {
    await new Promise(resolve => setTimeout(resolve,1000))
    const postWithAuthors = post.map(post=>({
        ...post, author : users.find(user=>user.id === post.authorId)
    })   )
    return NextResponse.json(postWithAuthors)
}

export async function POST(request : Request) {
    const body = await request.json();
    const newPost = {
        id : post.length + 1,
        ...body, 
        createdAt : new Date().toISOString(),
        updateAt : new Date().toISOString()
    }
    post.push(newPost);
    return NextResponse.json(newPost, {status : 201})
}