-- prepares a MySQL server for the ClimateWavers

CREATE DATABASE IF NOT EXISTS climatwavers_db;
CREATE USER IF NOT EXISTS 'climatwavers_dev'@'localhost' IDENTIFIED BY 'climatwavers_dev_pwd';
GRANT ALL PRIVILEGES ON `climatwavers_dev_db`.* TO 'climatwavers_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'climatwavers_dev'@'localhost';
FLUSH PRIVILEGES