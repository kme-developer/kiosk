import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Orders extends Model {}

Orders.init(
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
    isUser: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    state: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Orders',
  }
);

export default Orders;
