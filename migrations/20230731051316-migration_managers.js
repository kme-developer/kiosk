'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Managers', {
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
      email: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        unique: true, // UNIQUE
      },
      password: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Managers');
  },
};
