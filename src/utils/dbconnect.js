const { Sequelize } = require("sequelize");

//Connect to climatewavers MariaDB database
const sequelize = new Sequelize(process.env.MARIADB_DB_NAME, process.env.MARIADB_USER, process.env.MARIADB_PASSWORD, {
	host: process.env.MARIADB_SERVER,
	dialect:  'mysql'
  });
module.exports = sequelize
