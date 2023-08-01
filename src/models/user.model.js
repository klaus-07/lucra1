const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const Roles = require('./role.model');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});

const User = sequelize.define('Users', {
  countryPrifix: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  numeral: {
    type: DataTypes.STRING,
  },
  taradeRegisterNumebr: {
    type: DataTypes.STRING,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  // address: {
  //   type: DataTypes.STRING,
  // },
  street: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  numberOfEmploye: {
    type: DataTypes.STRING,
  },
  activityDescription: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
  },
  roleIds: {
    type: DataTypes.STRING,
  },
  account: {
    type: DataTypes.JSON,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('User created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

Roles.hasMany(User);
User.belongsTo(Roles);

// User.hashMany(Roles);
// Campaign.associate = (models) => {
//   models.Campaign.hasMany(models.emailLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
// };
// Campaign.hasMany(emaiLog, { foreignKey: { name: 'campaign_id' }, as: 'email_log' });
module.exports = User;
