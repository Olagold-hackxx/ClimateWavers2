from django.conf import settings
from django.conf.urls.static import static
from .views import confirm_registration
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),  # Homepage
    path("n/login", views.login_view, name="login"),  # Login page
    path("n/logout", views.logout_view, name="logout"),  # Logout page
    path("n/register", views.register, name="register"),  # Registration page 
    path('confirm/<str:uidb64>/<str:token>/', confirm_registration, name='confirm-registration'), #Confirm registration
    path("<str:username>", views.profile, name="profile"),  # CustomUser profile page
    path("n/following", views.following, name="following"),  # Following page
    path("n/saved", views.saved, name="saved"),  # Saved posts page
    path("n/createpost", views.create_post, name="createpost"),  # Create a new post page
    path("n/community/<int:id>/like", views.like_post, name="likepost"),  # Like a post
    path("n/community/<int:id>/unlike", views.unlike_post, name="unlikepost"),  # Unlike a post
    path("n/community/<int:id>/save", views.save_post, name="savepost"),  # Save a post
    path("n/community/<int:id>/unsave", views.unsave_post, name="unsavepost"),  # Unsave a post
    path("n/community/<int:post_id>/comments", views.comment, name="viewcomments"),  # View comments on a post (use the 'comment' view)
    path("n/community/<int:post_id>/write_comment", views.comment, name="writecomment"),  # Write a comment on a post (use the 'comment' view)
    path("n/community/<int:post_id>/delete", views.delete_post, name="deletepost"),  # Delete a post
    path("n/community/<int:post_id>/edit", views.edit_post, name="editpost"),  # Edit a post
    path("<str:username>/follow", views.follow, name="followuser"),  # Follow a user
    path("<str:username>/unfollow", views.unfollow, name="unfollowuser"), # Unfollow a user
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

