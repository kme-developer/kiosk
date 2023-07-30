// src/database/relations/item.relations.js

import Items from '../models/item';
import OrderItems from '../models/orderItem';

export default () => {
  Items.hasMany(OrderItems, {
    sourceKey: 'id',
    foreignKey: 'item_id',
  });
};
