import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class OrderItems extends Model {}

OrderItems.init(
  {
    id: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PK
      type: DataTypes.INTEGER,
    },
    item_id: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    order_id: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    option: {
      allowNull: true,
      type: DataTypes.JSON,
    },
    price: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'OrderItems',
    timestamps: false,
  }
);

export { OrderItems };
