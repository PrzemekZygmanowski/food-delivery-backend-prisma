import { knex } from '../src/database/connection.js';
try {
  const result = await knex('restaurants').where('id', 2).del();
  console.log(result);
} catch (error) {
  console.error(`there is error: ${error}`);
}

await knex.destroy();
