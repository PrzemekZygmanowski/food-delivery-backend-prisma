import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const orders = await prisma.order.findMany({});

await prisma.$disconnect();
console.log(orders);
