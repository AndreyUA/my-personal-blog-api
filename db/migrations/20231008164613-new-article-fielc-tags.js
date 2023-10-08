'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Articles', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Articles', 'tags');
  },
};
