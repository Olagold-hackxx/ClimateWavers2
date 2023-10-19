-- prepares a Postgresql server for ClimateWavers Redhat SSO

CREATE DATABASE  climatewavers;
CREATE USER wavers WITH ENCRYPTED PASSWORD 'waverx';
GRANT ALL PRIVILEGES ON  DATABASE climatewavers TO wavers;
FLUSH PRIVILEGES
