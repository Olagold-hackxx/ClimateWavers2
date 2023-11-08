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

   The Django server will be available at `http://localhost:8001`.

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

### User Management

#### Register User
- **Endpoint**: `/api/v1/backend/register`
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:
  - `username`: User's username (required)
  - `email`: User's email address (required)
  - `password`: User's password (required)
  - Additional fields for user profile (e.g., `first_name`, `last_name`, `profession`, etc.)
- **Response**:
  - HTTP 201 Created: User registered successfully.
  - HTTP 400 Bad Request: Invalid or missing data.
  - HTTP 405 Method Not Allowed: GET method not allowed.

#### Verify User
- **Endpoint**: `/api/v1/backend/<str:user_id>/verify`
- **Method**: GET
- **Description**: Send a confirmation email to the user for account verification.
- **Response**:
  - HTTP 201 Created: Confirmation email sent.
  - HTTP 400 Bad Request: Invalid user or email already taken.

#### Check User Verification Status
- **Endpoint**: `/api/v1/backend/<str:user_id>/status`
- **Method**: GET
- **Description**: Check the verification status of a user.
- **Response**: User verification status.

#### Login User
- **Endpoint**: `/api/v1/backend/login`
- **Method**: POST
- **Description**: User login.
- **Request Body**:
  - `username` or `email`: User's username or email address (required)
  - `password`: User's password (required)
- **Response**:
  - HTTP 200 OK: Login successful with access token.
  - HTTP 401 Unauthorized: Invalid credentials.
  - HTTP 400 Bad Request: Missing data.
  - HTTP 401 Unauthorized: Unverified account.

#### Logout User
- **Endpoint**: `/api/v1/backend/logout`
- **Method**: POST
- **Description**: Log out the user and refresh the refresh token.
- **Response**:
  - HTTP 200 OK: User logged out successfully.

#### User Profile
- **Endpoint**: `/api/v1/backend/profile/<str:username>`
- **Method**: GET
- **Description**: Retrieve a user's profile details, posts, and follower/following counts.
- **Response**: User profile information, posts, and follower/following counts.

#### Edit User Profile
- **Endpoint**: `/api/v1/backend/edit_profile`
- **Method**: PUT
- **Description**: Edit the user's profile information.
- **Response**: Updated user profile details.

#### User Followers
- **Endpoint**: `/api/v1/backend/followers/<str:username>`
- **Method**: GET
- **Description**: Retrieve a list of users following the specified user.
- **Response**: List of followers.

#### User Followings
- **Endpoint**: `/api/v1/backend/followings/<str:username>`
- **Method**: GET
- **Description**: Retrieve a list of users that the specified user is following.
- **Response**: List of followings.

#### Current User's Followings
- **Endpoint**: `/api/v1/backend/my_followings`
- **Method**: GET
- **Description**: Retrieve the list of users that the current user is following.
- **Response**: List of followings.

#### Current User's Followers
- **Endpoint**: `/api/v1/backend/my_followers`
- **Method**: GET
- **Description**: Retrieve the list of users following the current user.
- **Response**: List of followers.

#### User Following Posts
- **Endpoint**: `/api/v1/backend/following_posts`
- **Method**: GET
- **Description**: Retrieve posts from users that the current user is following.
- **Response**: List of posts from followed users.

#### User Saved Posts
- **Endpoint**: `/api/v1/backend/saved`
- **Method**: GET
- **Description**: Retrieve posts saved by the current user.
- **Response**: List of saved posts.

#### Change Password
- **Endpoint**: `/api/v1/backend/change_password`
- **Method**: POST
- **Description**: Change the user's password.
- **Response**: Password changed successfully or an error message.

#### Reset Password
- **Endpoint**: `/api/v1/backend/reset_password`
- **Method**: POST
- **Description**: Reset the user's password.
- **Response**: Password reset confirmation.

#### Request Password Reset
- **Endpoint**: `/api/v1/backend/password_reset`
- **Method**: POST
- **Description**: Request a password reset email.
- **Response**: Password reset email confirmation.

#### Refresh Token
- **Endpoint**: `/api/v1/backend/refresh_token`
- **Method**: POST
- **Description**: Refresh the user's access token using a refresh token.
- **Response**: New access token or an error message.

### Posts

#### Get All Posts
- **Endpoint**: `/api/v1/backend`
- **Method**: GET
- **Description**: Retrieve all posts.
- **Response**: List of posts and access token.

#### Get Posts in "Happening" Category
- **Endpoint**: `/api/v1/backend/happening`
- **Method**: GET
- **Description**: Retrieve posts in the "Happening" category.
- **Response**: List of posts in the "Happening" category and access token.

#### Get Posts in "Education" Category
- **Endpoint**: `/api/v1/backend/education`
- **Method**: GET
- **Description**: Retrieve posts in the "Education" category.
- **Response**: List of posts in the "Education" category and access token.

#### Get Posts in "Community" Category
- **Endpoint**: `/api/v1/backend/community`
- **Method**: GET
- **Description**: Retrieve posts in the "Community" category.
- **Response**: List of posts in the "Community" category and access token.

#### Create Post
- **Endpoint**: `/api/v1/backend/create_post`
- **Method**: POST
- **Description**: Create a new post.
- **Request Body**:
  - `text`: Post content (optional)
  - `picture`: Post image (optional)
  - `category`: Post category (required)
- **Response**:
  - HTTP 201 Created: Post created successfully.
  - HTTP 400 Bad Request: Invalid or missing data.

#### Edit Post
- **Endpoint**: `/api/v1/backend/edit_post/<int:post_id>`
- **Method**: PUT
- **Description**: Edit an existing post.
- **Request Body**:
  - `text`: Updated post content (optional)
  - `picture`: Updated post image (optional)
  - `img_change`: Flag to indicate image change (optional)
- **Response**:
  - HTTP 200 OK: Post edited successfully.
  - HTTP 400 Bad Request: Invalid data.
  - HTTP 403 Forbidden: Permission denied.

#### Like Post
- **Endpoint**: `/api/v1/backend/like_post/<int:post_id>`
- **Method**: PUT
- **Description**: Like a post.
- **Response**:
  - HTTP 204 No Content: Post liked.
  - HTTP 400 Bad Request: Error liking the post.
  - HTTP 405 Method Not Allowed: GET method not allowed.

#### Unlike Post
- **Endpoint**: `/api/v1/backend/unlike_post/<int:post_id>`
- **Method**: PUT
- **Description**: Unlike a post.
- **Response**:
  - HTTP 204 No Content: Post unliked.
  - HTTP 400 Bad Request: Error unliking the post.

#### Comment on Post
- **Endpoint**: `/api/v1/backend/comment/<int:post_id>`
- **Method**: POST
- **Description**: Add a comment to a post.
- **Request Body**:
  - `text`: Comment content (required)
- **Response**:
  - HTTP 201 Created: Comment added successfully.
  - HTTP 400 Bad Request: Invalid or missing data.

#### Edit Comment
- **Endpoint**: `/api/v1/backend/edit_comment/<int:comment_id>`
- **Method**: PUT
- **Description**: Edit an existing comment on a post.
- **Request Body**:
  - `text`: Updated comment content (required)
- **Response**:
  - HTTP 200 OK: Comment edited successfully.
  - HTTP 400 Bad Request: Invalid or missing data.
  - HTTP 403 Forbidden: Permission denied.

#### Delete Comment
- **Endpoint**: `/api/v1/backend/delete_comment/<int:comment_id>`
- **Method**: DELETE
- **Description**: Delete a comment on a post.
- **Response**:
  - HTTP 204 No Content: Comment deleted.
  - HTTP 403 Forbidden: Permission denied.

#### Delete Post
- **Endpoint**: `/api/v1/backend/delete_post/<int:post_id>`
- **Method**: DELETE
- **Description**: Delete a post.
- **Response**:
  - HTTP 204 No Content: Post deleted.
  - HTTP 403 Forbidden: Permission denied.

## Environment Variables

- **SECRET_KEY:** Django secret key for security (store in a secure environment).
- **DEBUG:** Set to `True` for development, `False` for production.
- **DATABASE_URL:** Database connection URL for MYSQL databases.
- **ALLOWED_HOSTS:** List of allowed hostnames for the Django server.


## License

This project is licensed under the [MIT License](LICENSE).
