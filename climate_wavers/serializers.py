from rest_framework import serializers
from .models import CustomUser, Post, Comment, Follower

# Serializer for the CustomUser model
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'  # Serialize all fields of the CustomUser model

# Serializer for the Post model
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'  # Serialize all fields of the Post model

# Serializer for the Comment model
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
    email = serializers.EmailField(required=True)  # Email field for password reset request
