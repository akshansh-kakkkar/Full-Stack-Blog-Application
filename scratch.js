const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.postView.count();
  console.log("Total PostViews in DB:", count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
