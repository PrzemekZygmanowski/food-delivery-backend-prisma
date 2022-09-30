import { knex } from './database/connection.js';

const restaurants = await knex('restaurants');

await knex.destroy();
console.log(restaurants);
