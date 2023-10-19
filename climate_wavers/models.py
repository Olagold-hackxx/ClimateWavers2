from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    # User profile information
    profile_pic = models.ImageField(upload_to='profile_pic/')  # Profile picture of the user
    bio = models.TextField(max_length=160, blank=True, null=True)  # User's bio or short description
    cover = models.ImageField(upload_to='covers/', blank=True)  # Cover image for the user's profile
    
    # Additional fields for profession, phone number, and last location
    profession = models.CharField(max_length=100, blank=True, null=True)  # User's profession
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # User's phone number
    last_location = models.CharField(max_length=255, blank=True, null=True)  # User's last known location

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

class Post(models.Model):
    # User-generated posts
    creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')  # User who created the post
    date_created = models.DateTimeField(default=timezone.now)  # Date and time of post creation
    content_text = models.TextField(max_length=140, blank=True)  # Text content of the post
    content_image = models.ImageField(upload_to='posts/', blank=True)  # Image content of the post
    likers = models.ManyToManyField(User, blank=True, related_name='likes')  # Users who liked the post
    savers = models.ManyToManyField(User, blank=True, related_name='saved')  # Users who saved the post
    comment_count = models.IntegerField(default=0)  # Count of comments on the post

    def __str__(self):
        return f"Post ID: {self.id} (creater: {self.creater})"

    def img_url(self):
        # Method to get the URL of the post's content image
        return self.content_image.url

    def append(self, name, value):
        # Method that doesn't seem to have a clear purpose, may need additional documentation

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

class Comment(models.Model):
    # Comments on user posts
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')  # Post to which the comment belongs
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commenters')  # User who made the comment
    comment_content = models.TextField(max_length=90)  # Text content of the comment
    comment_time = models.DateTimeField(default=timezone.now)  # Date and time of comment creation

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

class Follower(models.Model):
    # User followers and following relationships
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')  # User being followed by others
    followers = models.ManyToManyField(User, blank=True, related_name='following')  # Users following the specified user

    def __str__(self):
        return f"User: {self.user}"
