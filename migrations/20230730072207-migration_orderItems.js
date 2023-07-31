'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      item_id: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      order_id: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      option: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      price: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  },
};
