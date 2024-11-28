'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import('nanoid');  // Dynamic import
    await queryInterface.createTable('verifications', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: () => nanoid(),
        allowNull: false,
      },
      identifier: { type: Sequelize.STRING, allowNull: false },
      value: { type: Sequelize.STRING, allowNull: false },
      expires_at: { type: Sequelize.DATE, allowNull: false },
      
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verifications');
  },
};
