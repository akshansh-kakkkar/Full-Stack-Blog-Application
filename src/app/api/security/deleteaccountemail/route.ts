import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request : Request){
    try{
        const {email} = await request.json();
        const result = await resend.emails.send({
            from : "Devlogs Security <sequrity@email.notsodev.com>",
            to : email
            subject :  "Alert your account has been deleted"
            html : 
        })
    }
    catch(error){
        return NextResponse.json({error : "Something went wrong."}, {status : 500})
    }
}