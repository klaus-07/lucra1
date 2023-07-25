'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('admins', 'forgotObj', {
      type: DataTypes.JSON, // Adjust the data type according to your needs
      allowNull: true, // Set to false if the column should not allow null values
      defaultValue: null, // Set a default value if needed
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('admins', 'forgotObj');
  },
};
