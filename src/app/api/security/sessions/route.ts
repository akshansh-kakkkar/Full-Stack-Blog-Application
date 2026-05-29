import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getSession();
    if(!session){
       return NextResponse.json({error : "Unauthorized"}, {status :401})
    }
    const sessions = await prisma.session.findMany({
        where : {
            userId : session?.user.id
        },
        orderBy : {
            updatedAt : "desc"
        },
        take:3
    })
    return NextResponse.json({message : "All sessions Fetched Successfully" , sessions})
}

export async function DELETE(){
    const session = await getSession();
    if(!session){
        return NextResponse.json({error : "Unauthorized"}, {status:401})
    }
    const revokeSessions = await  prisma.session.deleteMany({
        where : {
            userId : session.user.id
        }
    })
    return NextResponse.json({message : "All sessions Revoked", revokeSessions})
}