import { Items } from '../models/item';
import { OrderItems } from '../models/orderItem';
import { Orders } from '../models/order';

export default () => {
  OrderItems.belongsTo(Items, {
    targetKey: 'item_id',
    foreignKey: 'item_id',
  });

  OrderItems.belongsTo(Orders, {
    targetKey: 'order_id',
    foreignKey: 'order_id',
  });
};
