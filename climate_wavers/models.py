from django.contrib.auth.models import AbstractUser
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.db import models
from django.utils import timezone


class CustomUser(AbstractUser):
    # CustomUser profile information

    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,
        help_text=(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': ("A user with that username already exists.")
        },
    )
    profile_pic = models.ImageField(
        upload_to='profile_pic/', blank=True, null=True)  # Profile picture of the user
    # CustomUser's bio or short description
    bio = models.TextField(max_length=160, blank=True, null=True)
    # Cover image for the user's profile
    cover = models.ImageField(upload_to='covers/', blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True)
    is_superuser = models.BooleanField(default=False, null=True)
    # Additional fields for profession, phone number, and last location
    profession = models.CharField(
        max_length=100, blank=True, null=True)  # CustomUser's profession
    phone_number = models.CharField(
        max_length=15, blank=True, null=True)  # CustomUser's phone number
    # CustomUser's last known location
    last_location = models.CharField(max_length=255, blank=True, null=True)
    # CustomUser's google authentication method
    is_google_user = models.BooleanField(default=False, null=True)
    # CustomUser's redhat authentication method
    is_redhat_user = models.BooleanField(default=False, null=True)
    is_verified = models.BooleanField(default=False)  # verification status
    # CustomUser's with twitter authentication method
    is_twitter_user = models.BooleanField(default=False, null=True)
    # CustomUser's with facebook authentication method
    is_facebook_user = models.BooleanField(default=False, null=True)
    is_staff = models.BooleanField(default=False, null=True)
    is_active = models.BooleanField(default=True, null=True)
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


class Post(models.Model):
    # CustomUser-generated posts
    # CustomUser who created the post
    creater = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='posts')
    date_created = models.DateTimeField(
        default=timezone.now)  # Date and time of post creation
    content_text = models.TextField(
        max_length=140, blank=True)  # Text content of the post
    content_image = models.ImageField(
        upload_to='posts/', blank=True)  # Image content of the post
    # CustomUsers who liked the post
    likers = models.ManyToManyField(
        CustomUser, blank=True, related_name='likes')
    # CustomUsers who saved the post
    savers = models.ManyToManyField(
        CustomUser, blank=True, related_name='saved')
    comment_count = models.IntegerField(
        default=0)  # Count of comments on the post

    def __str__(self):
        return f"Post ID: {self.id} (creater: {self.creater})"

    def img_url(self):
        # Method to get the URL of the post's content image
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


class Comment(models.Model):
    # Comments on user posts
    # Post to which the comment belongs
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    # CustomUser who made the comment
    commenter = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='commenters')
    comment_content = models.TextField(
        max_length=90)  # Text content of the comment
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


class Follower(models.Model):
    # CustomUser followers and following relationships
    # CustomUser being followed by others
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='followers')
    # CustomUsers following the specified user
    followers = models.ManyToManyField(
        CustomUser, blank=True, related_name='following')

    class Meta:
        db_table = 'follower'

    def __str__(self):
        return f"CustomUser: {self.user}"

@receiver(m2m_changed, sender=Post.likers.through)
def update_likers(sender, instance, **kwargs):
    if kwargs['action'] == 'post_add':
        # Get the user that was added to the likers
        user = kwargs['pk_set'].pop()
        # Add the user to the likers
        instance.likers.add(user)

