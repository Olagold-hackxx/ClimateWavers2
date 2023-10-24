from django.contrib.auth.models import AbstractUser
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.db import models
from django.utils import timezone

# CustomUser model extending the AbstractUser class
class CustomUser(AbstractUser):
    # CustomUser profile information

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
    
    # User's profile picture (optional)
    profile_pic = models.ImageField(
        upload_to='profile_pic/', blank=True, null=True)
    
    # User's bio or short description (optional)
    bio = models.TextField(max_length=160, blank=True, null=True)
    
    # Cover image for the user's profile (optional)
    cover = models.ImageField(upload_to='covers/', blank=True, null=True)
    
    # User's password (optional, for future reference)
    password = models.CharField(max_length=255, blank=True, null=True)
    
    # User's email (unique)
    email = models.EmailField(unique=True)
    
    # User's role (can be superuser)
    is_superuser = models.BooleanField(default=False, null=True)
    
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
    
    # Redhat authentication method
    is_redhat_user = models.BooleanField(default=False, null=True)
    
    # User verification status
    is_verified = models.BooleanField(default=False)
    
    # Twitter authentication method (optional)
    is_twitter_user = models.BooleanField(default=False, null=True)
    
    # Facebook authentication method (optional)
    is_facebook_user = models.BooleanField(default=False, null=True)
    
    # User staff status
    is_staff = models.BooleanField(default=False, null=True)
    
    # User's activity status (active by default)
    is_active = models.BooleanField(default=True, null=True)
    
    # User registration date
    date_joined = models.DateTimeField(default=timezone.now, null=True)

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
    creater = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    # Date and time of post creation
    date_created = models.DateTimeField(auto_now_add=True)
    
    # Text content of the post (optional)
    content_text = models.TextField(blank=True, null=True)
    
    # Image content of the post (optional)
    content_image = models.ImageField(upload_to='posts/', blank=True, null=True)
    
    # Users who liked the post
    likers = models.ManyToManyField(CustomUser, related_name='liked_posts', blank=True)
    
    # Users who saved the post
    savers = models.ManyToManyField(CustomUser, related_name='saved_posts', blank=True)
    
    # Count of comments on the post
    comment_count = models.PositiveIntegerField(default=0)
    
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
    # Post to which the comment belongs
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    
    # User who made the comment
    commenter = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='commenters')
    
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
    # User being followed by others
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='followers')
    
    # Users following the specified user
    followers = models.ManyToManyField(
        CustomUser, blank=True, related_name='following')

    class Meta:
        db_table = 'follower'

    def __str__(self):
        return f"CustomUser: {self.user}"

# Signal receiver to update likers for a post
@receiver(m2m_changed, sender=Post.likers.through)
def update_likers(sender, instance, **kwargs):
    if kwargs['action'] == 'post_add':
        # Get the user that was added to the likers
        user = kwargs['pk_set'].pop()
        # Add the user to the likers
        instance.likers.add(user)
