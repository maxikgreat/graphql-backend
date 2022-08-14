import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'max' },
    update: {},
    create: {
      username: 'max',
      password: '1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'sasha' },
    update: {},
    create: {
      username: 'sasha',
      password: '2',
    },
  });

  console.log('Seeded to database', { user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
