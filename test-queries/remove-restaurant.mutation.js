import { knex } from '../src/database/connection.js';
import { Restaurant } from '../src/models/Restaurant.js';
try {
  const result = await Restaurant.query()
    .findById(2)
    .throwIfNotFound({ message: 'Restaurant not found' })
    .del();
  console.log(result);
} catch (error) {
  console.error(`there is error: ${error}`);
}

await knex.destroy();
