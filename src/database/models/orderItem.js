import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class OrderItems extends Model {}

OrderItems.init(
  {
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

export default OrderItems;
