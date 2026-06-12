const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.findFirst();
  const user = await prisma.user.findFirst();
  if (!post || !user) {
    console.log("No post or user found");
    return;
  }
  const view = await prisma.postView.upsert({
          where: {
            postId_userId: {
              postId: post.id,
              userId: user.id,
            },
          },
          update: {},
          create: {
            postId: post.id,
            userId: user.id,
          },
        });
  console.log("Upserted:", view);
}
main().catch(console.error).finally(() => prisma.$disconnect());
