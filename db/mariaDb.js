const { Sequelize } = require('sequelize');
const logger = require('../logger');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT
});

async function connectMariaDB() {
  try {
    await sequelize.authenticate();
    logger.info('Connected to MariaDB');
  } catch (err) {
    logger.error('Error connecting to MariaDB:', err);
  }
}

connectMariaDB();

module.exports = { sequelize };
