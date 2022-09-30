import bcrypt from 'bcryptjs';

const genPassword = () => bcrypt.hash('s4mpl3Pa55word', 10);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('restaurants').del();
  await knex('users').del();

  await knex('users').insert([
    { id: 1, email: 'user1@gmail.com', password: await genPassword() },
    { id: 2, email: 'user2@gmail.com', password: await genPassword() },
  ]);
  await knex('restaurants').insert([
    { id: 1, name: 'maczek', address: 'zakoscielna 2', type: 'fastfood' },
    { id: 2, name: 'sushi w dlon', address: 'zakoscielna 3', type: 'sushi' },
  ]);
  await knex('products').insert([
    {
      id: 1,
      name: 'cziken burger',
      description: 'kurczak w bułce',
      price: 10,
      restaurant_id: 1,
    },
    {
      id: 2,
      name: 'maki',
      description: '24 rolls',
      price: 90,
      restaurant_id: 2,
    },
  ]);
  await knex('orders').insert([
    { id: 1, date: new Date(), user_id: 1, restaurant_id: 1 },
    { id: 2, date: new Date(), user_id: 2, restaurant_id: 2 },
  ]);
  await knex('orders_products').insert([
    { order_id: 1, product_id: 1, price: 9 },
    { order_id: 2, product_id: 2, price: 89 },
  ]);
  await knex('deliveries').insert([
    { order_id: 1  },
    { delivery_date: new Date(), order_id: 2 },
  ]);
}
