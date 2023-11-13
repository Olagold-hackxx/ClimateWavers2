# Climate Wavers - Django Server

The Django Server microservice of Climate wavers is responsible for handling core functionalities, user management, and data processing tasks. Built on the Django rest framework, this server provides a robust and secure backend for the application.

## Table of Contents

  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Setting up a MariaDB Database](#setting-up-a-mariadb-database)
  - [Installation and Setup](#installation-and-setup)
  - [Environment Variables](#environment-variables)
  - [Deployment](#deployment)
  - [License](#license)

## Project Overview

The Climate Change and Disaster Response Platform aims to monitor climate changes, predict natural disasters, and facilitate efficient disaster response. Leveraging Django, the server component ensures seamless user experience, data management, and integration with various data sources.

## Features

- **User Authentication:** Secure user registration, login, and profile management.
- **Data Management:** Store and manage user data, community information, and other data for application.
- **Real-time Data Processing:** Process incoming data streams for analysis and visualization.
- **Collaborative Communities:** Enable users to form communities, share observations, and collaborate.
- **API Endpoints:** Provides RESTful APIs for frontend interaction and external integrations.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   https://github.com/ClimateWavers/backend.git
   cd backend
   ```
2. **Create virtual environment:**
  ```bash
  python3 -m venv myenv -- "Name of the virtual environment"
  ```
   -  Activate virtual environment:
  ```bash
  source myenv/bin/activate
  ```
3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Setup:**
   - Configure the database settings in `settings.py`.
   - Run migrations:
     ```bash
     python manage.py migrate
     ```

5. **Static and Media Files:**
   - Collect static files:
     ```bash
     python manage.py collectstatic
     ```
   - Configure media file settings in `settings.py`.

6. **Run the Django Development Server:**
   ```bash
   python manage.py runserver
   ```

   The Django server will be available at `http://localhost:8001`.

## Setup MariaDB
To start MariaDB, refer to the database microservice repository `https://github.com/ClimateWavers/database` or the branch - database, at development repository `https://github.com/Olagold-hackxx/ClimateWavers`

### Database Configuration
1. Open your Django project's `settings.py`.
2. Locate the `DATABASES` section.
3. Configure the database settings. Here's an example configuration for MariaDB:

   ```python
   # ... (Your existing settings)
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'your_database_name',
           'USER': 'your_database_user',
           'PASSWORD': 'your_database_password',
           'HOST': 'localhost or deployment service name',  # Set the host where your MariaDB is running
           'PORT': '3306',  # Default MariaDB port
       }
   }
    
## Environment Variables

- **SECRET_KEY:** Django secret key for security 
- **DEBUG:** Set to `True` for development, `False` for production.
- **ALLOWED_HOSTS:** List of allowed hostnames for the Django server.
-  **MARIADB_PASSWORD:** Database Password
-  **MARIADB_USER:** Database user
-  **VERIFICATION_MAIL:** Personalized verification mail
-  **DOMAIN:** Application domain or frontend url
-  **APP_EMAIL:** Application email
-  **MARIADB_DB_NAME:** Database name
-  **MARIADB_PORT:** Database port, 3306 default value for mariadb
-  **MARIADB_SERVER:** Database host, localhost on development environment, database service name on openshift cluster
-  **BACKEND:** 

## Deployment
We provide three different methods for deploying this microservice to openshift clusters.
### Import Git Repositoy (Recommended)
Use the import git repository feature on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select Dockerfile strategy
- Deployment type should be Deployment Config
- Secure routes
- Supply the environment variables after deployment
  
### Automated Command line Deployment
Using the scripts provided in `automate_development` folder, simplifies deployment. To use the scripts, docker and oc must be installed.

#### Build and push image
You can replace the image repository in the scripts `build.sh` in `automate_deployment` or use the repository we provided.
  ```bash
   automate_deployment/./build.sh
   ```
#### Deploy 
If the image repository was changed when building, update the `development.yaml` file in `k8s` folder with your image repository
  ```bash
   automate_deployment/./deploy.sh
   ```

### Tekton pipeline deployment script
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory
   ```bash
   automate_deployment/./pipeline.sh
   ```

## License

This project is licensed under the [MIT License](LICENSE).
