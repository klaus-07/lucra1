'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'account', {
      type: DataTypes.JSON,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removecolumn('users', 'account');
  },
};
