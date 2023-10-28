# Import necessary modules and libraries
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.db.utils import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Post, Comment, Follower
from django.contrib.auth import update_session_auth_hash
import logging
from .serializers import CustomUserSerializer, PostSerializer, CommentSerializer, FollowerSerializer, ChangePasswordSerializer

# View for displaying the homepage with posts and suggestions for logged-in users.
@api_view(['GET'])
@permission_classes([])
def index(request):
    # Retrieve all users ordered by date joined
    all_users = CustomUser.objects.all().order_by('date_joined')

    # Serialize the users using the CustomUserSerializer
    serializer = CustomUserSerializer(all_users, many=True)

    return Response(serializer.data)

# View for user registration.
@api_view(['POST'])
@permission_classes([])  # No authentication required
def register(request):
    if request.method == "POST":
        # Get user data from the request data
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        profession = request.data.get("profession")
        phone_number = request.data.get("phone_number")
        last_location = request.data.get("last_location")
        profile_pic = request.FILES.get("profile_pic")
        bio = request.data.get("bio")
        cover = request.FILES.get("cover")
        # Add other fields as needed

        # Check if required fields are provided
        if not username or not email or not password:
            return Response({"message": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a CustomUser with the provided data
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password,
                profession=profession,
                phone_number=phone_number,
                last_location=last_location,
                profile_pic=profile_pic,
                bio=bio,
                cover=cover,
                is_active=False  # User is not active until confirmed
                # Add other fields here
            )

            # Generate a confirmation token for the user
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk)) 
            
            
            # Save the token in the user's profile or wherever you want
            user.confirmation_token = token
            user.save()
             
            # Build the confirmation URL
            current_site = get_current_site(request)
            confirmation_url = reverse('confirm-registration',
                kwargs={'uidb64': uid, 'token': token})
            confirmation_url = f'http://{current_site.domain}{confirmation_url}'

            # Send a confirmation email
            subject = 'Confirm Your Registration'
            message = f'Please click the following link to confirm your registration: {confirmation_url}'
            from_email = 'climatewaver@gmail.com'  # Replace with your email
            recipient_list = [user.email]

            send_mail(subject, message, from_email, recipient_list)

            return Response({'message': 'User registered. Confirmation email sent.'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"message": "Username or email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for user login.
@api_view(['POST'])
@permission_classes([])
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
@permission_classes([])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

# View for displaying a user's profile.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, username):
    user = CustomUser.objects.get(username=username)
    all_posts = Post.objects.filter(creater=user).order_by('-date_created')
    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page', 1)
    posts = paginator.get_page(page_number)
    followings = []
    suggestions = []
    follower = False

    if request.user.is_authenticated:
        # Get users following the current user
        followings = Follower.objects.filter(followers=request.user).values_list('user', flat=True)
        # Get user suggestions
        suggestions = CustomUser.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

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
    suggestions = CustomUser.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

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
    suggestions = CustomUser.objects.exclude(pk__in(followings).exclude(username=request.user.username).order_by("?")[:6])

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
        category = request.data.get('category')  # Added category
        try:
            post = Post.objects.create(creater=request.user, content_text=text, content_image=pic, category=category)
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
        user = CustomUser.objects.get(username=username)
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
        user = CustomUser.objects.get(username=username)
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

# This view is for obtaining an authentication token.
@api_view(['POST'])
@permission_classes([])  # No authentication needed
def obtain_auth_token(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid username and/or password."}, status=status.HTTP_401_UNAUTHORIZED)

# Configure the logger
logger = logging.getLogger(__name__)


# View for confirming user registration.
@api_view(['GET'])
@permission_classes([])
def confirm_registration(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)

        logger.info(f"User ID: {user.id}, Token: {token}")

        if default_token_generator.check_token(user, token):
            logger.info("Token is valid.")
            user.is_active = True
            user.save()
            return HttpResponse("Your registration has been confirmed.")
        else:
            logger.warning("Confirmation link is invalid.")
            return HttpResponse("Confirmation link is invalid.")
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist) as e:
        logger.error(f"Error: {e}")
        return HttpResponse("Confirmation link is invalid.")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])  # No authentication required
def password_reset_request(request):
    if request.method == "POST":
        email = request.data.get("email")

        # Check if the email is provided
        if not email:
            return Response({"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Find the user with the provided email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user is not None:
            # Generate a reset token for the user
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Build the reset password URL
            reset_url = reverse('password_reset_confirm',
                kwargs={'uidb64': uid, 'token': token})
            reset_url = request.build_absolute_uri(reset_url)

            # Send a reset password email
            subject = 'Password Reset Request'
            message = f'Please click the following link to reset your password: {reset_url}'
            from_email = 'climatewaver@gmail.com'  # Replace with your email
            recipient_list = [user.email]

            send_mail(subject, message, from_email, recipient_list)

            return Response({'status': 'OK'}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for editing a user's profile.
@api_view(['PUT'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def edit_profile(request):
    if request.method == 'PUT':
        user = request.user
        data = request.data

        # You can update the fields that you want to allow users to edit
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.profession = data.get('profession', user.profession)
        user.phone_number = data.get('phone_number', user.phone_number)
        user.last_location = data.get('last_location', user.last_location)
        user.bio = data.get('bio', user.bio)

        # Handle profile picture and cover image updates
        if 'profile_pic' in request.FILES:
            user.profile_pic = request.FILES['profile_pic']
        if 'cover' in request.FILES:
            user.cover = request.FILES['cover']

        try:
            user.save()
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
