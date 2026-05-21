import { betterAuth } from "better-auth";
import { prisma } from "@/lib/prisma";
import * as process from 'node:process';
export const auth = betterAuth({
    database : prisma,
    emailAndPassword : {
        enabled : true,
    },
    socialProviders : {
        google : {
            clientId : 
                process.env.GOOGLE_CLIENT_ID!,
            clientSecret : 
                process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    secret : process.env.BETTER_AUTH_SECRET,
    baseURL : process.env.BETTER_AUTH_URL
})