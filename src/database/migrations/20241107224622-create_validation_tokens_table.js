'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: { type: Sequelize.STRING, allowNull: false },
      token: { type: Sequelize.TEXT, allowNull: false, unique: true },
      expires: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verification_tokens');
  }
};
