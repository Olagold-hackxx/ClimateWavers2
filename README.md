# Climate Wavers - Django Server

<img width="1000" alt="image" src="https://github.com/Olagold-hackxx/ClimateWavers2/assets/133222922/bd3a5667-d3cd-48d9-b6d6-c8ac673dd49f">

The Django Server component of the Climate Change and Disaster Response Platform is responsible for handling core functionalities, user management, and data processing tasks. Built on the Django web framework, this server provides a robust and secure backend for the application.

## Table of Contents

- [Climate Wavers - Django Server](#climate-wavers---django-server)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Installation and Setup](#installation-and-setup)
    - [Setting up a MariaDB Database](#setting-up-a-mariadb-database)
    - [Starting MariaDB](#starting-mariadb)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)
  - [License](#license)

## Project Overview

The Climate Change and Disaster Response Platform aims to monitor climate changes, predict natural disasters, and facilitate efficient disaster response. Leveraging Django, the server component ensures seamless user experience, data management, and integration with various data sources.

## Features

- **User Authentication:** Secure user registration, login, and profile management.
- **Data Management:** Store and manage user data, community information, and datasets.
- **Real-time Data Processing:** Process incoming data streams for analysis and visualization.
- **Collaborative Communities:** Enable users to form communities, share observations, and collaborate.
- **API Endpoints:** Provides RESTful APIs for frontend interaction and external integrations.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/IsmaelKiprop/ClimateWavers.git
   cd ClimateWavers
   ```
2. **Create virtual environment:**
  ```bash
  python3 -m venv myenv -- "Name of the virtual environment"
  ```
  - Activate virtual environment:
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

   The Django server will be available at `http://localhost:8000`.

## Setting up a MariaDB Database

### Install MariaDB
If you haven't already, you need to install MariaDB on your server or local development environment. You can download MariaDB from the [official website](https://mariadb.org/).

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
           'HOST': 'localhost',  # Set the host where your MariaDB is running
           'PORT': '3306',  # Default MariaDB port
       }
   }
	```

## Starting MariaDB

### Start the MariaDB Server
To start MariaDB, you can use the following command:

```bash
sudo service mariadb start
```
## Access MariaDB

### Access the MariaDB Shell
You can access the MariaDB shell by running the following command:

```bash
mysql -u your_database_user -p
```
### Create the Database
Inside the MariaDB shell, you can create your database if it doesn't exist. Use the following SQL command:

```bash
CREATE DATABASE your_database_name;
```

### Grant Permissions
To ensure the database user has appropriate permissions on the database, execute the following SQL command:

```bash
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_database_user'@'localhost' IDENTIFIED BY 'your_database_password';
```

### Exit MariaDB Shell
To leave the MariaDB shell, simply type:

```bash
exit
```
## API Endpoints

# Climate Wavers API Documentation

This documentation outlines the API endpoints for the Climate Wavers application. Climate Wavers is a social platform where users can share posts, interact with other users, and follow their favorite content creators. The API provides various features, including user management, post creation, likes, comments, and more.

## Authentication

Before using the Climate Wavers API, users must register and log in to obtain an access token. The access token should be included in the headers of all API requests for authentication. In addition, some endpoints require user verification and authorization.

## Base URL

`https://backend-olagoldhackxx-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/backend/`


All endpoints are relative to this base URL.

## API Endpoints

### User Management

- `POST /register`: Register a new user.
- `GET /confirm/<str:uidb64>/<str:token>`: Confirm user registration.
- `POST /login`: Log in as an existing user.
- `GET /logout`: Log out the current user.
- `GET /users`: List all users.
- `GET /<str:username>/profile`: View a user's profile.
- `PUT /edit-profile`: Edit the current user's profile.
- `GET /<str:user_id>/verify`: Verify a user.
- `GET /<str:user_id>/status`: Check the verification status of a user.
- `POST /reset_password`: Initiate a password reset process.
- `POST /password_reset`: Send a password reset email.

### Posts

- `GET /`: Display all posts on the homepage.
- `GET /education`: Display posts in the "Education" category.
- `GET /happening`: Display posts in the "Happening Now" category.
- `GET /community`: Display posts in the "Community" category.
- `POST /posts/create`: Create a new post.
- `PUT /posts/<str:post_id>/edit`: Edit an existing post.
- `PUT /posts/<str:post_id>/like`: Like a post.
- `PUT /posts/<str:post_id>/unlike`: Unlike a post.
- `PUT /posts/<str:post_id>/save`: Save a post.
- `PUT /posts/<str:post_id>/unsave`: Unsave a post.
- `GET /following/posts`: Display posts from users the current user is following.
- `GET /posts/saved`: Display posts saved by the current user.
- `PUT /posts/<str:post_id>/delete`: Delete a post.
- `GET /posts/<str:post_id>/comments`: View comments on a post.
- `POST /posts/<str:post_id>/comment`: Write a comment on a post.
- `GET /comments/<str:comment_id>/subcomments`: View all subcomments on a comment.
- `POST /comments/<str:comment_id>/subcomment`: Write subcomments on a comment.
- `PUT /comments/<str:comment_id>/edit`: Edit a comment.

### Followers and Followings

- `PUT /<str:username>/follow`: Follow a user.
- `PUT /<str:username>/unfollow`: Unfollow a user.
- `GET /<str:username>/followers`: List a user's followers.
- `GET /<str:username>/followings`: List a user's followings.
- `GET /followers`: List the current user's followers.
- `GET /followings`: List the current user's followings.

### Password Management

- `POST /change_password`: Change the user's password.
- `POST /access_token/refresh`: Obtain a new access token.

Error Handling

The API returns appropriate HTTP status codes and error messages in the response body. Please refer to the API documentation for specific error codes and messages.

Please note that this documentation provides an overview of the available API endpoints and their purposes. Additional details, request and response formats, and required parameters should be included in your API documentation for comprehensive usage instructions.

Make sure to replace `https://backend-olagoldhackxx-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/backend/` with the correct base URL that you intend to use for your API.

## Environment Variables

- **SECRET_KEY:** Django secret key for security (store in a secure environment).
- **DEBUG:** Set to `True` for development, `False` for production.
- **DATABASE_URL:** Database connection URL for MYSQL databases.
- **ALLOWED_HOSTS:** List of allowed hostnames for the Django server.


## License

This project is licensed under the [MIT License](LICENSE).
