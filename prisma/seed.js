import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const genPassword = () => bcrypt.hash('s4mpl3Pa55word', 10);

const prisma = new PrismaClient();

await prisma.user.deleteMany({});
await prisma.restaurant.deleteMany({});

await prisma.user.create({
  data: { id: 1, email: 'user1@gmail.com', password: await genPassword() },
});
await prisma.user.create({
  data: { id: 2, email: 'user2@gmail.com', password: await genPassword() },
});
await prisma.restaurant.create({
  data: {
    id: 1,
    name: 'maczek',
    address: 'zakoscielna 2',
    type: 'fastfood',
    product: {
      create: [
        {
          id: 1,
          name: 'cziken burger',
          description: 'kurczak w bułce',
          price: 10,
        },
        {
          id: 2,
          name: 'burger cziken',
          description: 'bułka w kurczaku',
          price: 12,
        },
        {
          id: 3,
          name: 'cziken bez burger',
          description: 'kurczak bez bułki',
          price: 15,
        },
      ],
    },
  },
});
await prisma.restaurant.create({
  data: {
    id: 2,
    name: 'sushi w dlon',
    address: 'zakoscielna 3',
    type: 'sushi',
    product: {
      create: [
        {
          id: 4,
          name: 'maki',
          description: '24 rolls',
          price: 90,
        },
        {
          id: 5,
          name: 'toomoaki',
          description: 'kurczak w ciesie',
          price: 32,
        },
      ],
    },
  },
});

await prisma.order.create({
  data: {
    userId: 1,
    restaurantId: 1,
    delivery: {
      create: { address: 'my super street   ' },
    },
    products: { create: { price: 95, product: { connect: { id: 1 } } } },
  },
});
await prisma.order.create({
  data: {
    userId: 2,
    restaurantId: 2,
    delivery: {
      create: {
        address: 'my super street  second ',
        deliveryDate: new Date(),
        status: 'DELIVERED',
      },
    },
    products: { create: { price: 31, product: { connect: { id: 4 } } } },
  },
});
