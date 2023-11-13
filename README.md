# Climate Wavers MariaDB Backend

This repository contains the backend component of the Climate Wavers application, responsible for managing data storage and communication between various microservices.

## Overview

The Climate Wavers application is an AI-driven disaster response and social media platform. This MariaDB backend is a crucial part of the architecture, providing a robust and scalable database solution to store and retrieve data for the application.

## Features

- **Data Storage**: MariaDB is used to store and manage data related to users, posts, disaster alerts, and other relevant information.
- **Microservices Integration**: The backend facilitates communication between different microservices, ensuring seamless interaction and data exchange.
- **Security**: The MariaDB backend ensures the security of stored data and implements access controls to protect sensitive information.
- **Scalability**: MariaDB provides scalability options to handle the growing volume of data as the application expands.

## Environment Variables

Ensure you have set the required environment variables for the MariaDB connection. These variables include:

- `MARIADB_USER`: The username for MariaDB authentication.
- `MARIADB_PASSWORD`: The password for MariaDB authentication.
- `MARIADB_DB_NAME`: The name of the MariaDB database.
- `MARIADB_PORT`: The port on which MariaDB is running.
- `MARIADB_SERVER`: The address or hostname of the MariaDB server. Database service on openshift cluster

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/climatewavers/database.git
   ```

2. Setup database in local environment

   ```bash
   cd database
   cat setup_mariadb | mysql -u root -p
   ```

## Deployment

We provide two different methods for deploying the database microservice to openshift clusters.

### Openshift MariaDB template (Recommended)
Using the  MariaDB template on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select All services and search for mariadb, persistent storage
- Fill the form with the details of database to use
- Update the environment variables of deployed microservices using the database with the database service name
  
### Automated Command line Deployment
Using the scripts provided in `automate_development` folder, simplifies deployment. To use the scripts, oc and kubectl must be installed.

#### Deploy mariaDB
```bash
./deploy.sh
```
#### Setup database on openshift
```bash
./database_setup.sh
```


## Contributing

If you would like to contribute to the development of the Climate Wavers MariaDB backend, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

