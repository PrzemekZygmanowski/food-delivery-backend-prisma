import { Model } from 'objection';
import { User } from './User.js';
import { Delivery } from './Delivery.js';
import { Restaurant } from './Restaurant.js';
import { Product } from './Product.js';

export class Order extends Model {
  static tableName = 'orders';
  static virtualAttributes = ['fullPrice'];
  fullPrice() {
    if (Array.isArray(this.products))
      return this.products.reduce((price, product) => {
        price + product.price, 0;
      });
    return null;
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'orders.userId',
        to: 'users.id',
      },
    },
    restaurant: {
      relation: Model.BelongsToOneRelation,
      modelClass: Restaurant,
      join: {
        from: 'orders.restaurantId',
        to: 'restaurants.id',
      },
    },
    product: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: 'orders.id',
        through: {
          from: 'orders_products.orderId',
          to: 'orders_products.productId',
          extra: ['price'],
        },
        to: 'products.id',
      },
    },
    delivery: {
      relation: Model.HasOneRelation,
      modelClass: Delivery,
      join: {
        from: 'orders.id',
        to: 'deliveries.orderId',
      },
    },
  };
}
