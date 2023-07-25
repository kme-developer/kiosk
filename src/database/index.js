import sequelize from './sequelize';

import relations from './relations';

Object.values(relations).forEach((excuteRelation) => {
  excuteRelation();
});

export { sequelize };
