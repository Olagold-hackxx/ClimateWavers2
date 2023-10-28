# Climate Wavers - Django Server

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

- **CustomUser Authentication:** Secure user registration, login, and profile management.
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

**API Documentation: ClimateWavers**

ClimateWavers API is designed to provide access to various features of the ClimateWavers platform, allowing developers to build applications and services around its functionality.

**Base URL**: `https://climatewavers.com/api/v1/`

### Endpoints

#### 1. Register a New User

- **URL**: `/n/register`
- **Method**: `POST`
- **Description**: Register a new user on the platform.
- **Request Body**:
    - `username`: User's username
    - `email`: User's email
    - `password`: User's password
    - `profession`: User's profession (optional)
    - `phone_number`: User's phone number (optional)
    - `last_location`: User's last location (optional)
    - `profile_pic`: User's profile picture (optional)
    - `bio`: User's bio (optional)
    - `cover`: User's cover image (optional)

- **Example Request**:

```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}
```

- **Response**:

```json
{
    "message": "User registered. Confirmation email sent."
}
```

#### 2. Confirm Registration

- **URL**: `/confirm/<str:uidb64>/<str:token>/`
- **Method**: `GET`
- **Description**: Confirm user registration after clicking on the confirmation link sent via email.

- **Response**:

```
Your registration has been confirmed.
```

#### 3. User Login

- **URL**: `/n/login`
- **Method**: `POST`
- **Description**: Log in a registered user.

- **Request Body**:
    - `username`: User's username
    - `password`: User's password

- **Example Request**:

```json
{
    "username": "john_doe",
    "password": "password123"
}
```

- **Response**:

```
User logged in successfully.
```

#### 4. User Logout

- **URL**: `/n/logout`
- **Method**: `POST`
- **Description**: Log out the currently logged-in user.

- **Response**:

```
User logged out successfully.
```

#### 5. User Profile

- **URL**: `/<str:username>`
- **Method**: `GET`
- **Description**: Retrieve a user's profile including their posts, followers, and following count.

- **Response**:

```json
{
    "username": "john_doe",
    "posts": [...],  // Array of user's posts
    "posts_count": 10,
    "is_follower": false,
    "follower_count": 100,
    "following_count": 50
}
```

#### 6. Create a New Post

- **URL**: `/n/createpost`
- **Method**: `POST`
- **Description**: Create a new post.

- **Request Body**:
    - `text`: Post content
    - `picture`: Post image (optional)
    - `category`: Post category (optional)

- **Example Request**:

```json
{
    "text": "Hello, world!",
    "category": "General"
}
```

- **Response**:

```
Post created successfully.
```

#### 7. Edit an Existing Post

- **URL**: `/n/community/<int:post_id>/edit`
- **Method**: `POST`
- **Description**: Edit an existing post.

- **Request Body**:
    - `text`: Updated post content
    - `picture`: Updated post image (optional)
    - `img_change`: Indicator if the image is changed (boolean)
    - `id`: Post ID

- **Example Request**:

```json
{
    "text": "Updated content",
    "picture": "new_image.jpg",
    "img_change": true,
    "id": 123
}
```

- **Response**:

```json
{
    "success": true,
    "text": "Updated content",
    "picture": "new_image.jpg"
}
```

#### 8. Like a Post

- **URL**: `/n/community/<int:id>/like`
- **Method**: `PUT`
- **Description**: Like a specific post.

- **Response**:

```
Post liked successfully.
```

#### 9. Unlike a Post

- **URL**: `/n/community/<int:id>/unlike`
- **Method**: `PUT`
- **Description**: Remove a like from a post.

- **Response**:

```
Post unliked successfully.
```

#### 10. Save a Post

- **URL**: `/n/community/<int:id>/save`
- **Method**: `PUT`
- **Description**: Save a post to the user's saved posts.

- **Response**:

```
Post saved successfully.
```

#### 11. Unsave a Post

- **URL**: `/n/community/<int:id>/unsave`
- **Method**: `PUT`
- **Description**: Remove a post from the user's saved posts.

- **Response**:

```
Post unsaved successfully.
```

#### 12. View Comments on a Post

- **URL**: `/n/community/<int:post_id>/comments`
- **Method**: `GET`
- **Description**: Retrieve comments on a specific post.

- **Response**:

```json
[
    {
        "comment_text": "Great post!",
        "commenter": "user123"
    },
    {
        "comment_text": "I agree!",
        "commenter": "user456"
    }
]
```

#### 13. Write a Comment on a Post

- **URL**: `/n/community/<int:post_id>/write_comment`
- **Method**: `POST`
- **Description**: Add a new comment to a post.

- **Request Body**:
    - `comment_text`: Comment text

- **Example Request**:

```json
{
    "comment_text": "Great post!"
}
```

- **Response**:

```json
{
    "comment_text": "Great post!",
    "commenter": "john_doe"
}
```

#### 14. Delete a Post

- **URL**: `/n/community/<int:post_id>/delete`
- **Method**: `PUT`
- **Description**: Delete a specific post.

- **Response**:

```
Post deleted successfully.
```

#### 15. Follow a User

- **URL**: `/<str:username>/follow`
- **Method**: `PUT`
- **Description**: Follow another user.

- **Response**:

```
You are now following user123.
```

#### 16. Unfollow a User

- **URL**: `/<str:username>/unfollow`
- **Method**: `PUT`
- **Description**: Unfollow a user.

- **Response**:

```
You are no longer following user123.
```
## Environment Variables

- **SECRET_KEY:** Django secret key for security (store in a secure environment).
- **DEBUG:** Set to `True` for development, `False` for production.
- **DATABASE_URL:** Database connection URL for MYSQL databases.
- **ALLOWED_HOSTS:** List of allowed hostnames for the Django server.


## License

This project is licensed under the [MIT License](LICENSE).
