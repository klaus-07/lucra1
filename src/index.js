// const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const token = require('./config/tokens');
const services = require('./services/user.service');

let server;
const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_password, {
  host: config.mysql.db_host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('mysql has been established successfully.');
    server = app.listen(config.port, () => {
      services.adminRegister({ name: 'admin', email: 'admin@admin.com', password: 'admin@123456' });
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
