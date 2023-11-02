from django.conf import settings
from django.conf.urls.static import static
from .views import confirm_registration
from .views import change_password, edit_profile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.urls import path
from . import views

urlpatterns = [
    # Homepage displaying all posts
    path("", views.index, name="index"),
    # Display education category posts
    path("education", views.education, name="education"),
    # Display happening now category posts
    path("happening", views.happening, name="happening_now"),
    # Display community category posts
    path("community", views.community, name="community"),
    # Users
    path("users", views.users, name="users"),
    # Login page
    path("login", ensure_csrf_cookie(views.login_view), name="login"),
    # Logout page
    path("logout", views.logout_view, name="logout"),
    # Registration page
    path("register", views.register, name="register"),
    # Confirm registration
    path('confirm/<str:uidb64>/<str:token>', confirm_registration, name='confirm-registration'),
    # Verify user
    path('<str:user_id>/verify', views.verify_user, name="verify_user"),
    # Check verification status
    path('<str:user_id>/status', views.verification_status, name="verification-status"),
    # User profile page
    path("<str:username>/profile", views.profile, name="profile"),
    # Add the URL pattern for the edit_profile view
    path('edit-profile', edit_profile, name='edit-profile'),
    # Following page
    path("following/posts", views.following_posts, name="following"),
    # Saved posts page
    path("posts/saved", views.saved, name="saved"),
    # Create a new post
    path("posts/create", views.create_post, name="create_post"),
    # Like a post
    path("posts/<str:post_id>/like", views.like_post, name="like_post"),
    # Unlike a post
    path("posts/<str:post_id>/unlike", views.unlike_post, name="unlike_post"),
    # Save a post
    path("posts/<str:post_id>/save", views.save_post, name="save_post"),
    # Unsave a post
    path("posts/<str:post_id>/unsave", views.unsave_post, name="unsave_post"),
    # View comments on a post (use the 'comment' view)
    path("posts/<str:post_id>/comments", views.comment, name="view_comments"),
    # Write a comment on a post (use the 'comment' view)
    path("posts/<str:post_id>/comment", views.comment, name="write_comment"),
    # WRite subcomments
    path("comments/<str:comment_id>/subcomment", views.subcomment, name="write_subcomment"),
    # View all subcomments
    path("comments/<str:comment_id>/subcomments", views.subcomment, name="subcomments"),

    # Edit comment
    path("comments/<str:comment_id>/edit", views.edit_comment, name="edit_comment"),
    # Delete a post
    path("posts/<str:post_id>/delete", views.delete_post, name="delete_post"),
    # Edit a post
    path("posts/<str:post_id>/edit", views.edit_post, name="edit_post"),
    # Follow a user
    path("<str:username>/follow", views.follow, name="follow_user"),
    # Unfollow a user
    path("<str:username>/unfollow", views.unfollow, name="unfollow_user"),
    # Change Password
    path('change_password', change_password, name='change_password'),
    # Reset Password
    path('reset_password', views.reset_password, name='reset_password'),
    # Password reset mail
    path('password_reset', views.password_reset, name='password_reset_mail'),
    # New access token
    path('access_token/refresh', views.refresh_token, name="refresh_access_token"),
    # Users' followers
    path("<str:username>/followers", views.followers, name="followers"),
    # Users' following
    path("<str:username>/followings", views.followings, name="following"),
    # Current user's followers
    path("followers", views.my_followers, name="my_follower"),
    # Current user's following
    path("followings", views.my_followings, name="my_following")

]

# Serve media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
