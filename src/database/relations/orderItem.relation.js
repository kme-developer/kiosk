// src/database/relations/orderItem.relations.js

import Items from '../models/item';
import OrderItems from '../models/orderItem';
import Orders from '../models/order';

export default () => {
  OrderItems.belongsTo(Items, {
    targetKey: 'id',
    foreignKey: 'item_id',
  });

  OrderItems.belongsTo(Orders, {
    targetKey: 'id',
    foreignKey: 'order_id',
  });
};
