from django.conf import settings
from django.conf.urls.static import static
from .views import confirm_registration
from .views import change_password, edit_profile
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import obtain_jwt_token
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Homepage
    path("", views.index, name="index"),

    # Login page
    path("n/login", views.login_view, name="login"),

    # Logout page
    path("n/logout", views.logout_view, name="logout"),

    # Registration page
    path("n/register", views.register, name="register"),

    # Confirm registration
    path('confirm/<str:uidb64>/<str:token>/', confirm_registration, name='confirm-registration'),


    # CustomUser profile page
    path("<str:username>", views.profile, name="profile"),
    
    
    # Add the URL pattern for the edit_profile view
    path('edit-profile/', edit_profile, name='edit-profile'),

    # Following page
    path("n/following", views.following, name="following"),

    # Saved posts page
    path("n/saved", views.saved, name="saved"),

    # Create a new post page
    path("n/createpost", views.create_post, name="createpost"),

    # Create a new post page with a category
    path("n/createpost/<str:category>", views.create_post, name="createpost"),

    # Like a post
    path("n/community/<int:id>/like", views.like_post, name="likepost"),

    # Unlike a post
    path("n/community/<int:id>/unlike", views.unlike_post, name="unlikepost"),

    # Save a post
    path("n/community/<int:id>/save", views.save_post, name="savepost"),

    # Unsave a post
    path("n/community/<int:id>/unsave", views.unsave_post, name="unsavepost"),

    # View comments on a post (use the 'comment' view)
    path("n/community/<int:post_id>/comments", views.comment, name="viewcomments"),

    # Write a comment on a post (use the 'comment' view)
    path("n/community/<int:post_id>/write_comment", views.comment, name="writecomment"),

    # Delete a post
    path("n/community/<int:post_id>/delete", views.delete_post, name="deletepost"),

    # Edit a post
    path("n/community/<int:post_id>/edit", views.edit_post, name="editpost"),

    # Follow a user
    path("<str:username>/follow", views.follow, name="followuser"),

    # Unfollow a user
    path("<str:username>/unfollow", views.unfollow, name="unfollowuser"),

    # Change Password
    path('change_password/', change_password, name='change_password'),
    
    # Reset Password
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),  
    
    # Obtain auth token
    path("api-token-auth/", obtain_auth_token, name="obtain_auth_token"),  
    
    # Include the token refresh view
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Obtain access token
    path('api/token/', obtain_jwt_token, name='token_obtain_pair'),
    
     
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
