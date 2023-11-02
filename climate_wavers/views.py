# Import necessary modules and libraries
import os
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User, Post, Comment, Follower, CustomToken
from .logger import logger
from .serializers import UserSerializer, PostSerializer, CommentSerializer, FollowerSerializer, ChangePasswordSerializer, CustomTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from itsdangerous import URLSafeTimedSerializer


# Secret key to sign the confirmation token
SECRET_KEY = os.getenv('SECRET_KEY')
# Create a serializer with the secret key and a salt value
serializer = URLSafeTimedSerializer(SECRET_KEY)


@api_view(['GET'])
def index(request):
    # Retrieve all users ordered by date joined
    all_posts = Post.objects.all().order_by('date_created')

    # Serialize the post data
    serializer = PostSerializer(all_posts, many=True)

    return JsonResponse({"all_posts": serializer.data})

@api_view(['GET'])
def happening(request):
    # Retrieve all posts in happening now category
    happening_posts = Post.objects.filter(category="Happening").order_by('date_created')

    # Serialize the post data
    serializer = PostSerializer(happening_posts, many=True)

    return JsonResponse({"happening_posts": serializer.data})

@api_view(['GET'])
def education(request):
    # Retrieve all posts in education category
    education_posts = Post.objects.filter(category="Education").order_by('date_created')

    # Serialize the post data
    serializer = PostSerializer(education_posts, many=True)
    return JsonResponse({"education_posts": serializer.data})

@api_view(['GET'])
def community(request):
    # Retrieve all posts in community category
    community_posts = Post.objects.filter(category="Community").order_by('date_created')

    # Serialize the post data
    serializer = PostSerializer(community_posts, many=True)

    return JsonResponse({"community_posts": serializer.data})


# View for displaying all users.
@api_view(['GET'])
def users(request):
    # Retrieve all users ordered by date joined
    all_users = User.objects.all().order_by('date_joined')

    # Serialize the users using the UserSerializer
    serializer = UserSerializer(all_users, many=True)

    return JsonResponse({"all_users": serializer.data})


# View for user registration.
@api_view(['POST'])
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
            return JsonResponse({"message": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a User with the provided data
            user = User.objects.create(
                username=username,
                email=email,
                profession=profession,
                phone_number=phone_number,
                last_location=last_location,
                profile_pic=profile_pic,
                bio=bio,
                cover=cover,
                is_verified=False, #User is not verified until confirmed
                is_active=False  # User is not active until confirmed
                # Add other fields here
            )

            # Hash and set the password
            user.set_password(password)
            user.save()

            # Generate a confirmation token for the user
            user_id = str(user.id)
            token = serializer.dumps(user_id.encode('utf-8'))
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Build the confirmation URL
            domain = os.getenv("DOMAIN")
            confirmation_url = reverse('confirm-registration',
                kwargs={'uidb64': uid, 'token': token})
            confirmation_url = f'{domain}{confirmation_url}'

            # Send a confirmation email
            subject = 'Confirm Your Registration'
            message = f'{os.getenv("VERIFICATION_MAIL")} {confirmation_url}'
            from_email = os.getenv("APP_EMAIL")  # Replace with your email
            recipient_list = [user.email]

            send_mail(subject, message, from_email, recipient_list)

            return JsonResponse({'message': 'User registered. Confirmation email sent.', "id": user.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": "Username or email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Verify user
@api_view(['GET'])
def verify_user(request, user_id):
    # Generate a confirmation token for the user
    try:
        user = User.objects.get(id=user_id)
        user_id = str(user_id)
        if user.is_verified:
            return JsonResponse({"message": "User is verified, Sign in instead"})
        token = serializer.dumps(user_id.encode('utf-8'))
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        # Build the confirmation URL
        domain = os.getenv("DOMAIN")
        confirmation_url = reverse('confirm-registration',
            kwargs={'uidb64': uid, 'token': token})
        confirmation_url = f'{domain}{confirmation_url}'
        # Send a confirmation email
        subject = 'Confirm Your Registration'
        message = f'{os.getenv("VERIFICATION_MAIL")} {confirmation_url}'
        from_email = os.getenv("APP_EMAIL")  # Replace with your email
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

        return JsonResponse({'message': 'User registered. Confirmation email sent.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(e)
        return JsonResponse({"message": "Username or email already taken."}, status=status.HTTP_400_BAD_REQUEST)

# Check user verification status
@api_view(['GET'])
def verification_status(request, user_id_param):
    try:
        user_id = user_id_param
        user = User.objects.get(id=user_id)
        return JsonResponse({"status": user.is_verified})
    except Exception as e:
        logger.error(e)



# View for user login.
@api_view(['POST'])
def login_view(request):
    if request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(Q(email=email) | Q(username=username))
            if not user.check_password(password):
                return JsonResponse({"message": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.info(e)
            print(e)
            return JsonResponse({"message": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if user is not None:
            # Find refresh tokens
            try:
                user_token = CustomToken.objects.get(user_id=user.id)
            except Exception:
                print(user.id)
                print("User doesn't have a refresh token")
                return JsonResponse({"message": "Please verify your account"})
            try:
                refresh_token = RefreshToken(user_token.refresh_token)
                # Generate new access tokens
                access_token = str(refresh_token.access_token)
                refresh_token = user_token.refresh_token
                user = UserSerializer(user)
                return JsonResponse({"refresh_token": refresh_token, "access_token": access_token, "user_details": user.data, "status": status.HTTP_200_OK})
            except Exception as e:
                logger.error(e)
                return JsonResponse({"message": "Please verify your account, refresh token is invalid"})

        return JsonResponse({"message": "Invalid username, email or password."}, status=status.HTTP_401_UNAUTHORIZED)

# View for user logout.
@api_view(['POST'])
def logout_view(request):
    try:
        # Create new refresh token for user and replace old one
        user = request.user
        refresh_token = RefreshToken.for_user(user)
        # Store new refresh token in the custom token table
        token = CustomToken.objects.create(user=user, refresh_token=str(refresh_token))
        token.save()
        return JsonResponse({"Logout successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(e)
        return JsonResponse({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

# View for displaying a user's profile.
@api_view(['GET'])
def profile(request, username):
    try:
        user = User.objects.get(username=username)
        user_details = UserSerializer(user)
        all_posts = []
        posts = []
        posts_count = 0
        follower = False
        follower_count = 0
        following_count = 0


        follower_count = Follower.objects.get(user=user).followers.all().count()
        following_count = Follower.objects.filter(followers=user).count()

        all_posts = Post.objects.filter(user=user).order_by('-date_created')
        posts_count = all_posts.count()
        # Serialize the posts using the PostSerializer
        serializer = PostSerializer(all_posts, many=True)
        posts = serializer.data
        try:
            if request.user in Follower.objects.get(user=user).followers.all():
                follower = True
        except Exception as e:
            logger.error(e)
            follower = False
    except Exception as e:
        logger.error(e)
    return JsonResponse({
        "user_details": user_details.data,
        "posts": posts,
        "posts_count": posts_count,
        "is_follower": follower,
        "follower_count": follower_count,
        "following_count": following_count
    })

# View for editing a user's profile.
@api_view(['PUT'])
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
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Get a user's followers
@api_view(['GET'])
def followers(request, username):
    try:
        user = User.objects.get(username=username)
        followers = Follower.objects.get(user_id=user.id)
        followers = FollowerSerializer(followers)
        return JsonResponse({
            "followers": followers.data
        })
    except Follower.DoesNotExist:
        return JsonResponse({
            "followers": []
        })
    except Exception as e:
        logger.error(e)
        return JsonResponse({
			"error": str(e)
		})

# Get current user's following
@api_view(['GET'])
def followings(request, username):
    try:
        user = User.objects.get(username=username)
        following = Follower.objects.filter(followers__username__contains=user)
        following = FollowerSerializer(following, many=True)
        return JsonResponse({
            "followings": following.data
        })
    except Follower.DoesNotExist:
        return JsonResponse({
            "followings": []
        })
    except Exception as e:
        logger.error(e)
        return JsonResponse({
			"error": str(e)
		})

# Get a user's following
@api_view(['GET'])
def my_followings(request):
    try:
        user = User.objects.get(id=request.user.id)
        following = Follower.objects.filter(followers__username__contains=user)
        following = FollowerSerializer(following, many=True)
        return JsonResponse({
            "followings": following.data
        })
    except Follower.DoesNotExist:
        return JsonResponse({
            "followings": []
        })
    except Exception as e:
        logger.error(e)
        return JsonResponse({
			"error": str(e)
		})

# Get current user's followers
@api_view(['GET'])
def my_followers(request):
    try:
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        followers = Follower.objects.get(user=user)
        followers = FollowerSerializer(followers)
        return JsonResponse({
            "followers": followers.data
        })
    except Follower.DoesNotExist:
        return JsonResponse({
            "followers": []
        })
    except Exception as e:
        logger.error(e)
        return JsonResponse({
			"error": str(e)
		})



# View for displaying posts from users the current user is following.
@api_view(['GET'])
def following_posts(request):
    following_user = Follower.objects.filter(followers=request.user).values('user')
    all_posts = Post.objects.filter(user__in=following_user).order_by('-date_created')

    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(all_posts, many=True)

    return JsonResponse({
        "posts": serializer.data,
    })


# View for displaying posts saved by the current user.
@api_view(['GET'])
def saved(request):
    try:
        all_posts = Post.objects.filter(savers=request.user).order_by('-date_created')

        # Serialize the posts using the PostSerializer
        serializer = PostSerializer(all_posts, many=True)

        print(serializer.data)
        return JsonResponse({
            "posts": serializer.data,
        })
    except Exception as e:
        logger.error(e)
        return JsonResponse({"error": str(e)})

# View for creating a new post.
@api_view(['POST'])
def create_post(request):
    if request.method == 'POST':
        text = request.data.get('text')
        pic = request.FILES.get('picture')
        category = request.data.get('category')  # Added category
        try:
            post = Post.objects.create(user=request.user, content_text=text, content_image=pic, category=category)
            posts = PostSerializer(post)
            return JsonResponse({"posts": posts.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# View for editing an existing post.
@api_view(['PUT'])
def edit_post(request, post_id):
    if request.method == 'PUT':
        text = request.data.get('text')
        pic = request.FILES.get('picture')
        img_chg = request.data.get('img_change')
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

            return JsonResponse({
                "success": True,
                "text": post_text,
                "picture": post_image
            })
        except Exception as e:
            logger.error(e)
            return JsonResponse({
                "success": False,
                "message": str(e)
            })

# View for liking a post.
@api_view(['PUT'])
def like_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=post_id)
        try:
            post.likers.add(request.user)
            post.save()
            return JsonResponse({"message": f"Liked post by {post.user}"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unliking a post.
@api_view(['PUT'])
def unlike_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=post_id)
        try:
            post.likers.remove(request.user)
            post.save()
            return JsonResponse({"message": f"Unliked post by {post.user}"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for saving a post.
@api_view(['PUT'])
def save_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=post_id)
        try:
            post = Post.objects.get(id=post_id)
            post.save_post(request.user)
            post.save()
            return JsonResponse({"message": "Post saved"}, status=200)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unsaving a post.
@api_view(['PUT'])
def unsave_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=post_id)
        try:
            post.savers.remove(request.user)
            post.save()
            return JsonResponse({"message": "Post unsaved"}, status=200)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for following a user.
@api_view(['PUT'])
def follow(request, username):
    if request.method == 'PUT':
        following = User.objects.get(username=username)
        try:
            follower, _ = Follower.objects.get_or_create(user=following)
            follower.followers.add(request.user)
            follower.save()
            return JsonResponse({"message": f"Followed {following.username}"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for unfollowing a user.
@api_view(['PUT'])
def unfollow(request, username):
    if request.method == 'PUT':
        following = User.objects.get(username=username)
        try:
            follower, _ = Follower.objects.get_or_create(user=following)
            follower.followers.remove(request.user)
            follower.save()
            return JsonResponse({"message": f"Unfollowed {following.username}"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# View for posting and retrieving comments on a post.
@api_view(['POST', 'GET'])
def comment(request, post_id):
    if request.method == 'POST':
        data = request.data
        comment = data.get('comment')
        post = Post.objects.get(id=post_id)
        try:
            new_comment = Comment.objects.create(post=post, commenter=request.user, comment_content=comment)
            post.comment_count += 1
            post.save()
            return JsonResponse(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        post = Post.objects.get(id=post_id)
        comments = Comment.objects.filter(post=post)
        comments = comments.order_by('-comment_time').all()
        subcomment_count = comments.subcomments.count()


        # Serialize the comments using the CommentSerializer
        serializer = CommentSerializer(comments, many=True)

        return JsonResponse({"comments": serializer.data, "count": subcomment_count}, status=200)

@api_view(['PUT'])
def edit_comment(request, comment_id):
    if request.method == 'PUT':
        data = request.data
        pic = request.FILES
        comment = Comment.objects.get(id=comment_id)
        try:
            comment.comment_content = data.get('comment', comment.comment_content)
            comment.content_image = pic.get('picture', comment.content_image)
            comment.save()
            edited_comment = CommentSerializer(comment)
            return JsonResponse({
                "edited_comment": edited_comment.data
            }, status=200)
        except Exception as e:
            logger.error(e)
            return JsonResponse({
                "success": False,
                "message": str(e)
            }, status=400)

# View for posting and retrieving comments on a post.
@api_view(['POST', 'GET'])
def subcomment(request, comment_id):
    if request.method == 'POST':
        data = request.data
        subcomment = data.get('comment')
        comment = Comment.objects.get(id=comment_id)
        post = Post.objects.get(id=comment.post_id)
        try:
            new_subcomment = Comment.objects.create(post=post, parent_comment = comment, commenter=request.user, comment_content=subcomment)
            post.comment_count += 1
            new_subcomment.save()
            return JsonResponse({"subcomment": CommentSerializer(new_subcomment).data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(e)
            return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        parent_comment = Comment.objects.get(id=comment_id)
        comments = Comment.objects.filter(parent_comment=parent_comment)
        comments = comments.order_by('-comment_time').all()

        # Serialize the comments using the CommentSerializer
        serializer = CommentSerializer(comments, many=True)

        return JsonResponse({"comments": serializer.data}, status=200)

# View for deleting a post.
@api_view(['PUT'])
def delete_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(id=post_id)
        if request.user == post.user:
            try:
                post.delete()
                return JsonResponse(status=status.HTTP_204_NO_CONTENT)
            except Exception as e:
                logger.error(e)
                return JsonResponse({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({"message": "You don't have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return JsonResponse({"message": "Method must be 'PUT'"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# View for confirming user registration.
@api_view(['GET'])
def confirm_registration(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if serializer.loads(token, max_age=3600):
            # Generate refresh tokens
            refresh_token = RefreshToken.for_user(user)
            user.is_active = True
            user.is_verified = True
            # Store tokens in the custom token table
            CustomToken.objects.create(user=user, refresh_token=str(refresh_token), is_valid=True)

            user.save()
            return HttpResponse("Your registration has been confirmed. Please sign in into your account")
        else:
            logger.warning("Confirmation link is invalid or expired.")
            return HttpResponse("Confirmation link is invalid or expired.")
    except Exception as e:
        logger.error(e)
        return HttpResponse("Confirmation link is invalid or expired.")

@api_view(['POST'])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                return JsonResponse({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return JsonResponse({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def reset_password(request):
    if request.method == "POST":
        user = request.user
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        if not (new_password or confirm_password):
            return JsonResponse({"error": "Password field missing"}, status=400)

        if new_password and new_password == confirm_password:
            user.set_password(new_password)
            user.save()
        else:
            return JsonResponse({"error": "Password  confirmation don't match"}, status=400)
    return JsonResponse({"message": "Password reset successfully"}, status=200)


@api_view(['POST'])
def password_reset(request):
    if request.method == "POST":
        email = request.data.get("email")
        username = request.data.get("username")

        # Check if the email or username is provided
        if not (username or  email):
            return JsonResponse({"message": "Email or username is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Find the user with the provided email
        try:
            user =  User.objects.get(Q(email=email) | Q(username=username))
        except Exception as e:
            logger.error(e)
            user = None

        if user is not None:
            # Generate a reset token for the user
            user_id = str(user.id)
            token = serializer.dumps(user_id.encode('utf-8'))
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Build the reset password URL
            reset_url = reverse('reset_password',
                kwargs={'uidb64': uid, 'token': token})
            reset_url = request.build_absolute_uri(reset_url)

            # Send a reset password email
            subject = 'Password Reset Request'
            message = f'Please click the following link to reset your password: {reset_url}'
            from_email = 'climatewaver@gmail.com'  # Replace with your email
            recipient_list = [user.email]
            send_mail(subject, message, from_email, recipient_list)
            return JsonResponse({'status': 'OK', 'message': 'Passord reset token sent'}, status=status.HTTP_200_OK)

    return JsonResponse({"error": "Password request failed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.data.get("refresh_token")
    try:
        # Attempt to refresh the refresh token
        refresh_token = RefreshToken(refresh_token)
        access_token = str(refresh_token.access_token)
        return JsonResponse({'access_token': access_token}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(e)
        return JsonResponse({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
