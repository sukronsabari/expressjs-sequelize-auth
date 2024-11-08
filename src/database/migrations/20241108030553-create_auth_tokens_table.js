'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auth_tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: { type: Sequelize.UUID, allowNull: false },
      refresh_token: { type: Sequelize.TEXT, allowNull: false },
      expires: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auth_tokens');
  }
};
