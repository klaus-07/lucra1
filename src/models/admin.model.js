const { Sequelize, DataTypes } = require('sequelize');
const Roles = require('./role.model');
const config = require('../config/config');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  forgotObj: {
    type: DataTypes.JSON, // Adjust the data type according to your needs
    allowNull: true, // Set to false if the column should not allow null values
    defaultValue: null, // Set a default value if needed
  },
});

// Admin.hasMany(Roles, { foreignKey: { name: 'adminId' }, as: 'email_log' });
// Admin.hasMany(Roles, { foreignKey: { name: 'adminId' } });

sequelize
  .sync()
  .then(() => {
    console.log('Admin created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

// Campaign.associate = (models) => {
//   models.Campaign.hasMany(models.emailLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
// };
// Campaign.hasMany(emaiLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
module.exports = Admin;
