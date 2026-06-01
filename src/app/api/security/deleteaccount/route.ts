import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request : Request){
    try{
        const {email} = await request.json();
        const result = await resend.emails.send({
            from : "Devlogs Security <security@mail.notsodev.com>",
            to : email,
            subject :  "Alert your account has been deleted",
            html : `
            <h2>Your account has been disabled successfully.</h2>
            <p>We are really sorry to see you go.</p>
            <p>If this was not you please contact us on this <a href="mailto:kakkarakshansh72@gmail.com">kakkarakshansh72@gmail.com</a>
            <p>Regards,</p>
            <a href="https://github.com/akshansh-kakkkar">Akshansh</a>
            `
        })
            console.log("Email Result", result)
        return NextResponse.json({success : true, result})
    }
    catch(error){
        return NextResponse.json({error : "Something went wrong." , success : false}, {status : 500})
    }
}