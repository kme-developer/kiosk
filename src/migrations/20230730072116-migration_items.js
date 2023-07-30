'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PK
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      name: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        unique: true, // UNIQUE
      },
      option_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      price: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false, // NOT NULL
        type: Sequelize.ENUM,
        values: ['coffee', 'desert', 'juice', 'tea'],
      },
      amount: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  },
};
