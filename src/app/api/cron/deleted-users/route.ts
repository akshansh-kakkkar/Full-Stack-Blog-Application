import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - 30);
        const deletedUser = await prisma.user.findMany({
            where : {
                isDeleted : true,
                deletedAt : {
                    lt : cutOffDate
                }
            }
        })
        for (const user of deletedUser){
            await prisma.user.delete({
                where : {
                    id : user.id
                }
            })
        }
        return NextResponse.json({
            success : true,
            deletedCount : deletedUser.length
        })
    }
    catch(error){
        return NextResponse.json({
            success : false,
            error : "Cron Job Failed"
        },{
            status : 500
        })
    }
}