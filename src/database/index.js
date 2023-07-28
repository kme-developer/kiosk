import sequelize from './sequelize';

import { Items } from './models/item';
import { Orders } from './models/order';
import { OrderItems } from './models/orderItem';

import relations from './relations';

Object.values(relations).forEach((excuteRelation) => {
  excuteRelation();
});

export { sequelize, Items, Orders, OrderItems };
