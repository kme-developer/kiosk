import sequelize from './sequelize';

import Item from './models/item';

import relations from './relations';

Object.values(relations).forEach((excuteRelation) => {
  excuteRelation();
});

export { sequelize, Item };
