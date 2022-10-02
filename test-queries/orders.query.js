import { knex } from '../src/database/connection.js';
import { Order } from '../src/models/Order.js';

const orders = await Order.query().withGraphFetched('user');
// const orders = await Order.query()
//   .withGraphFetched('user(withEmailOnly')
//   .modifiers({
//     withEmailOnly: (builder) => {
//       builder.select('email');
//     },
//   });

await knex.destroy();
console.log(orders);
