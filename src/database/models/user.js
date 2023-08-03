import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Users extends Model {}

Users.init(
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
    email: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
      unique: true, // UNIQUE
    },
    password: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Users',
  }
);

export default Users;
