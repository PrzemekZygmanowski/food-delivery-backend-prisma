import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
try {
  const result = await prisma.restaurant.delete({ where: { id: 2 } });
  console.log(result);
} catch (error) {
  console.error(`there is error: ${error}`);
}

await prisma.$disconnect();
