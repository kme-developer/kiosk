// src/database/relations/order.relations.js

import Orders from '../models/order';
import OrderItems from '../models/orderItem';

export default () => {
  Orders.hasMany(OrderItems, {
    sourceKey: 'id',
    foreignKey: 'order_id',
  });
};
