const { Sequelize, DataTypes, STRING } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});
const SubUser = sequelize.define('subUser', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('sub user table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = SubUser;
