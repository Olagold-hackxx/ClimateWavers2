-- prepares a MySQL server for the ClimateWavers

CREATE DATABASE IF NOT EXISTS climatwavets_dev_db;
CREATE USER IF NOT EXISTS 'climatwavets_dev'@'localhost' IDENTIFIED BY 'climatwavets_dev_pwd';
GRANT ALL PRIVILEGES ON `climatwavets_dev_db`.* TO 'climatwavets_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'climatwavets_dev'@'localhost';
FLUSH PRIVILEGES