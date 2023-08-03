// src/database/models/item.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Items extends Model {}

Items.init(
  {
    id: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PK
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    name: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
      unique: true, // UNIQUE
    },
    option_id: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false, // NOT NULL
      type: DataTypes.ENUM,
      values: ['ade', 'coffee', 'desert', 'tea'],
    },
    count: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Items',
  }
);

export default Items;
