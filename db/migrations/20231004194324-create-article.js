'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titleEn: {
        type: Sequelize.STRING,
      },
      contentEn: {
        type: Sequelize.STRING,
      },
      titleUa: {
        type: Sequelize.STRING,
      },
      contentUa: {
        type: Sequelize.STRING,
      },
      titleRu: {
        type: Sequelize.STRING,
      },
      contentRu: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  },
};
