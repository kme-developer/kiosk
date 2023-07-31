// src/database/relations/option.relations.js

import Options from '../models/option';
import Items from '../models/item';

export default () => {
  Options.hasMany(Items, {
    sourceKey: 'id',
    foreignKey: 'option_id',
  });
};
