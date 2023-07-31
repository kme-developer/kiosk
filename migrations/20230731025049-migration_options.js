'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Options', {
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
      extra_price: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      shot_price: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      hot: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: true, // false => only ICE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Options');
  },
};
