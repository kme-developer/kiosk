import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const orderState = {
  ORDERED: 'ordered',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
};

class Orders extends Model {}

Orders.init(
  {
    order_id: {
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
    isUser: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    state: {
      allowNull: false, // NOT NULL
      type: DataTypes.ENUM([orderState.ORDERED, orderState.PENDING, orderState.COMPLETED, orderState.CANCELED]),
      defaultValue: orderState.ORDERED,
    },
  },
  {
    sequelize,
    modelName: 'Orders',
  }
);

export { Orders, orderState };
