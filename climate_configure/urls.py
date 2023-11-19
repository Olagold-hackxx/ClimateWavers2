""" URL Configuration
"""
from django.urls import include, path

urlpatterns = [
    path("api/v1/backend/", include("climate_wavers.urls")),  # Include URLs from the "climate_wavers" app
]
