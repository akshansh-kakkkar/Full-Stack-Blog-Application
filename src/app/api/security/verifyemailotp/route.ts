import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request : Request){
    try{
    const session = await getSession();
    if(!session){
        return NextResponse.json({message : "Unauthorized"}, {status : 401});
    }
    const {otp , newEmail} = await request.json();
    if(!otp || !newEmail){
        return NextResponse.json({error : "OTP and Email are required"}, {status : 400})
    }
    const emailRequest = await prisma.emailupdate.findFirst({
        where : {
            userId : session.user.id,
            newEmail, 
            otp
        }
    })
    if(!emailRequest){
        return NextResponse.json({error : "Invalid OTP"}, {status : 400})
    }
    if(emailRequest.expiredAt  < new Date()){
        return NextResponse.json({error : "OTP has Expired"}, {status : 400})
    }
    await prisma.emailupdate.delete({
        where : {
            id : emailRequest.id
        }
    })

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            email: newEmail,
            emailVerified: true
        }
    })

    return NextResponse.json({verified : true})
}catch(error){
    
    return NextResponse.json({error : "Something Went Wrong"},{status : 500})
}
}