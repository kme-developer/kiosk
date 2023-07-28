import { Items } from '../models/item';
import { OrderItems } from '../models/orderItem';

export default () => {
  Items.hasMany(OrderItems, {
    sourceKey: 'item_id',
    foreignKey: 'item_id',
  });
};
