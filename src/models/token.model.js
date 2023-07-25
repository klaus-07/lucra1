const { Sequelize, DataTypes, STRING } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});
const { tokenTypes } = require('../config/tokens');

const Token = sequelize.define('Token', {
  token: {
    type: DataTypes.STRING,
  },
  user: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    // enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
  },
  expires: {
    type: DataTypes.DATE,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('token created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = Token;
