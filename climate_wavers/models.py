from django_rest_passwordreset.signals import reset_password_token_created
from django.db.models.signals import m2m_changed
from django.db import models
from django.utils import timezone
import bcrypt
import uuid

# User model extending the AbstractUser class
class User(models.Model):
    # User profile information

    # User's username (unique)
    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,  # Nullable field
        help_text=(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': ("A user with that username already exists.")
        },
    )

    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=150)

    # User's profile picture (optional)
    profile_pic = models.ImageField(
        upload_to='profile_pic/', blank=True, null=True, max_length=300)

    first_name =  models.CharField(max_length=150)
    last_name =  models.CharField(max_length=150)

    # User's bio or short description (optional)
    bio = models.TextField(max_length=160, blank=True, null=True)

    # Cover image for the user's profile (optional)
    cover = models.ImageField(upload_to='covers/', blank=True, null=True, max_length=300)

    # User's password (optional, in case of third party auth)
    password = models.BinaryField(max_length=255, null=True)

    def set_password(self, raw_password):
        # Hash the raw password using bcrypt and save it to the password field
        self.password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, raw_password):
        # Check if the raw password matches the stored bcrypt hash
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.password)

    # User's email (unique)
    email = models.EmailField(unique=True)
    # User's profession (optional)
    profession = models.CharField(
        max_length=100, blank=True, null=True)

    # User's phone number (optional)
    phone_number = models.CharField(
        max_length=15, blank=True, null=True)  # Fixed 'blank' syntax error

    # User's last known location (optional)
    last_location = models.CharField(max_length=255, blank=True, null=True)

    # Google authentication method
    is_google_user = models.BooleanField(default=False, null=True)
    # LinkedIn authentication method
    is_linkedin_user = models.BooleanField(default=False, null=True)
    # Github authentication method
    is_github_user = models.BooleanField(default=False, null=True)
    # Redhat authentication method
    is_redhat_user = models.BooleanField(default=False, null=True)
    # User verification status
    is_verified = models.BooleanField(default=False)

    # Twitter authentication method (optional)
    is_twitter_user = models.BooleanField(default=False, null=True)

    # Facebook authentication method (optional)
    is_facebook_user = models.BooleanField(default=False, null=True)

    # User's activity status (active by default)
    is_active = models.BooleanField(default=True, null=True)
    # Timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username

    def serialize(self):
        # Method to serialize user data for use in API responses
        return {
            'id': self.id,
            "username": self.username,
            "profile_pic": self.profile_pic.url,
            "first_name": self.first_name,
            "last_name": self.last_name
        }

# Post model for user-generated posts
class Post(models.Model):
    # User who created the post
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=150)

    # Date and time of post creation
    date_created = models.DateTimeField(auto_now_add=True)

    # Text content of the post (optional)
    content_text = models.TextField(blank=True, null=True)

    # Image content of the post (optional)
    content_image = models.ImageField(upload_to='posts/', blank=True, null=True)

    # Users who liked the post
    likers = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    # Users who saved the post
    savers = models.ManyToManyField(User, related_name='saved_posts', blank=True)


    # Post category with choices: 'community', 'education', 'reports' (default: 'community')
    category = models.CharField(max_length=20, choices=[('community', 'Community'), ('education', 'Education'), ('reports', 'Reports')], default='community')

    # Method to get the image URL
    def img_url(self):
        if self.content_image and hasattr(self.content_image, 'url'):
            return self.content_image.url

    class Meta:
        db_table = 'post'

    def like_post(self, user):
        # Method to record that a user liked the post
        self.likers.add(user)

    def unlike_post(self, user):
        # Method to record that a user unliked the post
        self.likers.remove(user)

    def save_post(self, user):
        # Method to record that a user saved the post
        self.savers.add(user)

    def unsave_post(self, user):
        # Method to record that a user unsaved the post
        self.savers.remove(user)

# Comment model for comments on user posts
class Comment(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=150)

    # Post to which the comment belongs
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    # Sub comments
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='subcomments')

    # User who made the comment
    commenter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='commenters')

    # Image content of the comment (optional)
    content_image = models.ImageField(upload_to='comment/', blank=True, null=True)

    # Text content of the comment (limited to 90 characters)
    comment_content = models.TextField(max_length=90)

    # Date and time of comment creation
    comment_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Post: {self.post} | Commenter: {self.commenter}"

    def serialize(self):
        # Method to serialize comment data for use in API responses
        return {
            "id": self.id,
            "commenter": self.commenter.serialize(),
            "body": self.comment_content,
            "timestamp": self.comment_time.strftime("%b %d %Y, %I:%M %p")
        }

    class Meta:
        db_table = 'comment'

# Follower model to manage user followers and following relationships
class Follower(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=150)
    # User being followed by others
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='followers')

    # Users following the specified user
    followers = models.ManyToManyField(
        User, blank=True, related_name='following')

    class Meta:
        db_table = 'follower'

    def __str__(self):
        return f"Follower: {self.user}"


class CustomToken(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=150)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='token')
    is_valid = models.BooleanField(default=False)
    refresh_token = models.CharField(max_length=2048)
    # Timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'token'
