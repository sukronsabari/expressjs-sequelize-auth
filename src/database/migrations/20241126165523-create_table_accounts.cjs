'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import('nanoid');  // Dynamic import

    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: () => nanoid(),
        allowNull: false,
      },
      user_id: { type: Sequelize.STRING, allowNull: false },
      account_id: { type: Sequelize.STRING, allowNull: false },
      provider_id: { type: Sequelize.STRING, allowNull: false },
      access_token: { type: Sequelize.STRING, allowNull: true },
      refresh_token: { type: Sequelize.STRING, allowNull: true },
      access_token_expires_at: { type: Sequelize.DATE, allowNull: true },
      refresh_token_expires_at: { type: Sequelize.DATE, allowNull: true },
      scope: { type: Sequelize.STRING, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: true },
      
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  },
};
