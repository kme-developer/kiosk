// src/database/relations/item.relations.js

import Items from '../models/item';
import OrderItems from '../models/orderItem';

export default () => {
  OrderItems.belongsTo(Items, {
    targetKey: 'id',
    foreignKey: 'option_id',
  });

  Items.hasMany(OrderItems, {
    sourceKey: 'id',
    foreignKey: 'item_id',
  });
};
