import { users,post } from "@/app/data/mockData";
import { NextResponse } from "next/server";

export async function GET(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userWithPosts = users.map(user =>({
        ...user, posts : post.filter(post => post.authorId === user.id)
    }))
    return NextResponse.json(userWithPosts);
}

export async function POST(request : Request){
    try{
        const body = await request.json();
        if(!body.name || !body.email){
            return NextResponse.json({error:"Name and Email is required"}, {status : 400})
            ;

        }
        const existingUser = users.find(user => user.email === body.email);
        if(existingUser){
            return NextResponse.json(
                {error : "User with this email already exists."}, {status : 409}
            )
        }
        const newUser = {
            id : Math.max(...users.map(user =>  user.id))+1,
            name : body.name,
            email : body.email,
        }
        users.push(newUser)
        return NextResponse.json(newUser, {status : 201})
    }
    catch(error){
        return NextResponse.json({error : "Something went wrong."}, {status : 400})
    }
}