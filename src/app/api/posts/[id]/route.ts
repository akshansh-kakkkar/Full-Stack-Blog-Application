import { post, users } from "@/app/data/mockData";
import { NextResponse } from "next/server";

export async function GET(request : Request,{params} : {params: {id : string}} ) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const postId = parseInt(params.id);
    const posts = post.find(p=> p.id === postId);
    if(!posts){
        return NextResponse.json({error : "Post not found"}, {status : 404});
    }
    const postWithAuthor = {
        ...post, 
        author : users.find(user => user.id === posts.authorId)
    }
    return NextResponse.json(postWithAuthor)

}