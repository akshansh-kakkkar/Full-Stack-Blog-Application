import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const session = await auth.api.getSession({
        headers : request.headers
    })
    if(!session){
        return NextResponse.json({error : "unauthorized"}, {status : 401})
    }
    const user = await prisma.user.findUnique({
        where : {
            id : session.user.id
        },
        include : {
            accounts : true
        }
    })
    const isSocialUser = user?.accounts.some(
        (account) =>
            account.providerId === "google" ||
        account.providerId === "github"
    )
    return NextResponse.json({isSocialUser})
}