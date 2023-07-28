import { Orders } from '../models/order';
import { OrderItems } from '../models/orderItem';

export default () => {
  Orders.hasMany(OrderItems, {
    sourceKey: 'order_id',
    foreignKey: 'order_id',
  });
};
