-- prepares a MySQL server for the ClimateWavers

CREATE DATABASE IF NOT EXISTS 'climatewavers_db';
CREATE USER IF NOT EXISTS 'climatewavers'@'localhost' IDENTIFIED BY 'waverx';
GRANT ALL PRIVILEGES ON 'climatewavers_db'.* TO 'climatewavers'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'climatewavers'@'localhost';
FLUSH PRIVILEGES