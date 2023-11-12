from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User, Post, Comment, Follower, CustomToken

# Serializer for the User model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "profession", "phone_number", "last_location",
                  "is_google_user",
                  "is_redhat_user",
                  "is_verified",
                  "is_linkedin_user",
                  "is_facebook_user",
                  "is_active",
                  "created_at",
                  "updated_at")  # Serialize all fields of the User model

# Serializer for the Post model


class PostSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_comments_count(self, obj):
        # Calculate and return the comments count for the specific post object
        return obj.comments.count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'  # Serialize all fields of the Comment model

# Serializer for the Follower model


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'  # Serialize all fields of the Follower model

# Serializer for changing the user's password


class ChangePasswordSerializer(serializers.Serializer):
    # Serializer to change the user's password
    old_password = serializers.CharField(required=True)  # Old password field
    new_password = serializers.CharField(required=True)  # New password field

# Serializer for sending a password reset email


class ResetPasswordEmailSerializer(serializers.Serializer):
    # Serializer to send a password reset email
    # Email field for password reset request
    email = serializers.EmailField(required=True)


class CustomTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomToken
        fields = '__all__'
