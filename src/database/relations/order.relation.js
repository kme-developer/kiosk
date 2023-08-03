// src/database/relations/order.relations.js

import Orders from '../models/order';
import Users from '../models/user';
import OrderItems from '../models/orderItem';

export default () => {
  Orders.belongsTo(Users, {
    targetKey: 'id',
    foreignKey: 'user_id',
  });

  Orders.hasMany(OrderItems, {
    sourceKey: 'id',
    foreignKey: 'order_id',
  });
};
