import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
    const { email } = await req.json();
    const result = await resend.emails.send({
        from: "Devlogs Security <security@mail.notsodev.com>",
        to: email,
        subject: "Alert : Your Devlogs Password has been changed",
        html: `<h2>Your Password was changed successfully</h2>
        <p>If that was not you contact support immediately</p>
        <p>By the way you can <a href="https://github.com/akshansh-kakkkar">Follow me</a> on github :)</a><p>
        <p>Regards, </div>
        <h3><a href="www.linkedin.com/in/akshansh-kakkar-94b945381">Akshansh Kakkar</a></h3>
        `
    })
    return NextResponse.json({ success: true , result}, )
}
catch(error){
    return NextResponse.json({message : "Something went wrong", error}, {status : 500})
}
}