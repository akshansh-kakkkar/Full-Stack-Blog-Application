import { PrismaClient } from '../generated/prisma/client';
const globalPrisma = globalThis as unknown as  {
  prisma :  PrismaClient | undefined
}

export const Prisma = globalPrisma.prisma ?? new PrismaClient();
if(process.env.NODE_ENV !== "production"){
    globalPrisma.prisma = Prisma;
}