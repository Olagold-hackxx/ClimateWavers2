from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
import json

from .models import *
from .serializers import PostSerializer  # Assuming you have a PostSerializer in a serializers.py file

# View for displaying the homepage with posts and suggestions for logged-in users.
@api_view(['GET'])
def index(request):
    all_posts = Post.objects.all().order_by('-date_created')
    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page')
    if page_number is None:
        page_number = 1
    posts = paginator.get_page(page_number)
    followings = []
    suggestions = []
    if request.user.is_authenticated:
        followings = Follower.objects.filter(followers=request.user).values_list('user', flat=True)
        suggestions = User.objects.exclude(
            Q(pk__in=followings) | Q(username=request.user.username)
        ).order_by("?")[:6]
    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(posts, many=True)
    return Response({
        "posts": serializer.data,
        "suggestions": suggestions,
        "page": "all_posts",
        'profile': False
    })

# View for user registration.
@api_view(['POST'])
def register(request):
    if request.method == "POST":
        # Get user data from the request data
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"message": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username, email, password)
            # You can add additional fields to the user model if needed

            # Automatically log in the user after registration
            login(request, user)

            return Response(status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"message": "Username or email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for user login.
@api_view(['POST'])
def login_view(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        return Response({"message": "Invalid username and/or password."}, status=status.HTTP_401_UNAUTHORIZED)

# View for user logout.
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

# View for displaying a user's profile.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, username):
    user = User.objects.get(username=username)
    all_posts = Post.objects.filter(creater=user).order_by('-date_created')
    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page', 1)
    posts = paginator.get_page(page_number)
    followings = []
    suggestions = []
    follower = False

    if request.user.is_authenticated:
        followings = Follower.objects.filter(followers=request.user).values_list('user', flat=True)
        suggestions = User.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

        if request.user in Follower.objects.get(user=user).followers.all():
            follower = True

    follower_count = Follower.objects.get(user=user).followers.all().count()
    following_count = Follower.objects.filter(followers=user).count()

    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(posts, many=True)

    return Response({
        "username": user,
        "posts": serializer.data,
        "posts_count": all_posts.count(),
        "suggestions": suggestions,
        "page": "profile",
        "is_follower": follower,
        "follower_count": follower_count,
        "following_count": following_count
    })

# View for displaying posts from users the current user is following.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def following(request):
    following_user = Follower.objects.filter(followers=request.user).values('user')
    all_posts = Post.objects.filter(creater__in=following_user).order_by('-date_created')
    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page', 1)
    posts = paginator.get_page(page_number)
    followings = Follower.objects.filter(followers=request.user).values_list('user', flat=True)
    suggestions = User.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(posts, many=True)

    return Response({
        "posts": serializer.data,
        "suggestions": suggestions,
        "page": "following"
    })

# View for displaying posts saved by the current user.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def saved(request):
    all_posts = Post.objects.filter(savers=request.user).order_by('-date_created')
    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page', 1)
    posts = paginator.get_page(page_number)
    followings = Follower.objects.filter(followers=request.user).values_list('user', flat=True)
    suggestions = User.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(posts, many=True)

    return Response({
        "posts": serializer.data,
        "suggestions": suggestions,
        "page": "saved"
    })

# View for creating a new post.
@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == 'POST':
        text = request.data.get('text')
        pic = request.FILES.get('picture')
        try:
            post = Post.objects.create(creater=request.user, content_text=text, content_image=pic)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# View for editing an existing post.
@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def edit_post(request, post_id):
    if request.method == 'POST':
        text = request.data.get('text')
        pic = request.FILES.get('picture')
        img_chg = request.data.get('img_change')
        post_id = request.data.get('id')
        post = Post.objects.get(id=post_id)
        try:
            post.content_text = text
            if img_chg != 'false':
                post.content_image = pic
            post.save()

            if post.content_text:
                post_text = post.content_text
            else:
                post_text = False
            if post.content_image:
                post_image = post.img_url()
            else:
                post_image = False

            return Response({
                "success": True,
                "text": post_text,
                "picture": post_image
            })
        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            })

# View for liking a post.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def like_post(request, id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=id)
        try:
            post.likers.add(request.user)
            post.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unliking a post.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def unlike_post(request, id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=id)
        try:
            post.likers.remove(request.user)
            post.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for saving a post.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def save_post(request, id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=id)
        try:
            post.savers.add(request.user)
            post.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unsaving a post.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def unsave_post(request, id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=id)
        try:
            post.savers.remove(request.user)
            post.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for following a user.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def follow(request, username):
    if request.method == 'PUT':
        user = User.objects.get(username=username)
        try:
            (follower, create) = Follower.objects.get_or_create(user=user)
            follower.followers.add(request.user)
            follower.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unfollowing a user.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def unfollow(request, username):
    if request.method == 'PUT':
        user = User.objects.get(username=username)
        try:
            follower = Follower.objects.get(user=user)
            follower.followers.remove(request.user)
            follower.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for posting and retrieving comments on a post.
@api_view(['POST', 'GET'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def comment(request, post_id):
    if request.method == 'POST':
        data = request.data
        comment = data.get('comment_text')
        post = Post.objects.get(id=post_id)
        try:
            new_comment = Comment.objects.create(post=post, commenter=request.user, comment_content=comment)
            post.comment_count += 1
            post.save()
            return Response(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        post = Post.objects.get(id=post_id)
        comments = Comment.objects.filter(post=post)
        comments = comments.order_by('-comment_time').all()

        # Serialize the comments using the CommentSerializer
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)

# View for deleting a post.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(id=post_id)
        if request.user == post.creater:
            try:
                post.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Exception as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You don't have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
