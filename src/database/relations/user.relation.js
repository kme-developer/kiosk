// src/database/relations/user.relations.js

import Users from '../models/user';
import Orders from '../models/order';

export default () => {
  Users.hasMany(Orders, {
    sourceKey: 'id',
    foreignKey: 'user_id',
  });
};
