
# API Documentation

## User Management

### Register User
- **Endpoint**: `/api/v1/backend/register`
- **Method**: POST
- **Description**: Register a new user and send a confirmation email to the user for account verification.
- **Request Body**:
  - `username`: User's username (required)
  - `email`: User's email address (required)
  - `password`: User's password (required)
  - Additional fields for user profile (e.g., `first_name`, `last_name`, `profession`, etc.)
- **Response**:
  - HTTP 201 Created: User registered successfully.
  - HTTP 400 Bad Request: Invalid or missing data.
  - HTTP 405 Method Not Allowed: GET method not allowed.

### Verify User
- **Endpoint**: `/api/v1/backend/<str:user_id>/verify`
- **Method**: GET
- **Description**: Send a confirmation email to the user for account verification.
- **Response**:
  - HTTP 201 Created: Confirmation email sent.
  - HTTP 400 Bad Request: Invalid user or email already taken.

### Check User Verification Status
- **Endpoint**: `/api/v1/backend/<str:user_id>/status`
- **Method**: GET
- **Description**: Check the verification status of a user.
- **Response**: User verification status.

### Login User
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

### Logout User
- **Endpoint**: `/api/v1/backend/logout`
- **Method**: POST
- **Description**: Log out the user and refresh the refresh token.
- **Response**:
  - HTTP 200 OK: User logged out successfully.

### User Profile
- **Endpoint**: `/api/v1/backend/profile/<str:username>`
- **Method**: GET
- **Description**: Retrieve a user's profile details, posts, and follower/following counts.
- **Response**: User profile information, posts, and follower/following counts.

### Edit User Profile
- **Endpoint**: `/api/v1/backend/edit_profile`
- **Method**: PUT
- **Description**: Edit the user's profile information.
- **Response**: Updated user profile details.

### User Followers
- **Endpoint**: `/api/v1/backend/followers/<str:username>`
- **Method**: GET
- **Description**: Retrieve a list of users following the specified user.
- **Response**: List of followers.

### User Followings
- **Endpoint**: `/api/v1/backend/followings/<str:username>`
- **Method**: GET
- **Description**: Retrieve a list of users that the specified user is following.
- **Response**: List of followings.

### Current User's Followings
- **Endpoint**: `/api/v1/backend/my_followings`
- **Method**: GET
- **Description**: Retrieve the list of users that the current user is following.
- **Response**: List of followings.

### Current User's Followers
- **Endpoint**: `/api/v1/backend/my_followers`
- **Method**: GET
- **Description**: Retrieve the list of users following the current user.
- **Response**: List of followers.

### User Following Posts
- **Endpoint**: `/api/v1/backend/following_posts`
- **Method**: GET
- **Description**: Retrieve posts from users that the current user is following.
- **Response**: List of posts from followed users.

### User Saved Posts
- **Endpoint**: `/api/v1/backend/saved`
- **Method**: GET
- **Description**: Retrieve posts saved by the current user.
- **Response**: List of saved posts.

### Change Password
- **Endpoint**: `/api/v1/backend/change_password`
- **Method**: POST
- **Description**: Change the user's password.
- **Response**: Password changed successfully or an error message.

### Reset Password
- **Endpoint**: `/api/v1/backend/reset_password`
- **Method**: POST
- **Description**: Reset the user's password.
- **Response**: Password reset confirmation.

### Request Password Reset
- **Endpoint**: `/api/v1/backend/password_reset`
- **Method**: POST
- **Description**: Request a password reset email.
- **Response**: Password reset email confirmation.

### Refresh Token
- **Endpoint**: `/api/v1/backend/refresh_token`
- **Method**: POST
- **Description**: Refresh the user's access token using a refresh token.
- **Response**: New access token or an error message.

## Posts

### Get All Posts
- **Endpoint**: `/api/v1/backend`
- **Method**: GET
- **Description**: Retrieve all posts.
- **Response**: List of posts and access token.

### Get Posts in "Happening" Category
- **Endpoint**: `/api/v1/backend/happening`
- **Method**: GET
- **Description**: Retrieve posts in the "Happening" category.
- **Response**: List of posts in the "Happening" category and access token.

### Get Posts in "Education" Category
- **Endpoint**: `/api/v1/backend/education`
- **Method**: GET
- **Description**: Retrieve posts in the "Education" category.
- **Response**: List of posts in the "Education" category and access token.

### Get Posts in "Community" Category
- **Endpoint**: `/api/v1/backend/community`
- **Method**: GET
- **Description**: Retrieve posts in the "Community" category.
- **Response**: List of posts in the "Community" category and access token.

### Create Post
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

### Edit Post
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

### Like Post
- **Endpoint**: `/api/v1/backend/like_post/<int:post_id>`
- **Method**: PUT
- **Description**: Like a post.
- **Response**:
  - HTTP 204 No Content: Post liked.
  - HTTP 400 Bad Request: Error liking the post.
  - HTTP 405 Method Not Allowed: GET method not allowed.

### Unlike Post
- **Endpoint**: `/api/v1/backend/unlike_post/<int:post_id>`
- **Method**: PUT
- **Description**: Unlike a post.
- **Response**:
  - HTTP 204 No Content: Post unliked.
  - HTTP 400 Bad Request: Error unliking the post.

### Comment on Post
- **Endpoint**: `/api/v1/backend/comment/<int:post_id>`
- **Method**: POST
- **Description**: Add a comment to a post.
- **Request Body**:
  - `text`: Comment content (required)
- **Response**:
  - HTTP 201 Created: Comment added successfully.
  - HTTP 400 Bad Request: Invalid or missing data.

### Edit Comment
- **Endpoint**: `/api/v1/backend/edit_comment/<int:comment_id>`
- **Method**: PUT
- **Description**: Edit an existing comment on a post.
- **Request Body**:
  - `text`: Updated comment content (required)
- **Response**:
  - HTTP 200 OK: Comment edited successfully.
  - HTTP 400 Bad Request: Invalid or missing data.
  - HTTP 403 Forbidden: Permission denied.

### Delete Comment
- **Endpoint**: `/api/v1/backend/delete_comment/<int:comment_id>`
- **Method**: DELETE
- **Description**: Delete a comment on a post.
- **Response**:
  - HTTP 204 No Content: Comment deleted.
  - HTTP 403 Forbidden: Permission denied.

### Delete Post
- **Endpoint**: `/api/v1/backend/delete_post/<int:post_id>`
- **Method**: DELETE
- **Description**: Delete a post.
- **Response**:
  - HTTP 204 No Content: Post deleted.
  - HTTP 403 Forbidden: Permission denied.

### Refresh Token
