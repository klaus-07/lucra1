const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const Admin = require('./admin.model');
const { User } = require('./index');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});

const Roles = sequelize.define('Role', {
  roleName: {
    type: DataTypes.STRING,
  },
  // adminId: {
  //   type: DataTypes.INTEGER,
  // },
  permission: {
    type: DataTypes.JSON, // Use JSON data type to store array-like data
    allowNull: true,
    defaultValue: [], //
  },
});

Roles.belongsTo(Admin); // Establishes the many-to-one relationship: Post belongs to User
Admin.hasMany(Roles);
sequelize
  .sync()
  .then(() => {
    console.log('Role created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

// Campaign.associate = (models) => {
//   models.Campaign.hasMany(models.emailLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
// };
// Campaign.hasMany(emaiLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
module.exports = Roles;
