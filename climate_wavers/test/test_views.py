from django.test import TestCase
from django.urls import reverse
from django.core import mail
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from .models import User, Post, Comment, Follower

class UserViewsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpassword"
            # Add other required fields here
        )
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()

    def test_user_registration(self):
        response = self.client.post(reverse("register"), {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword"
            # Add other required fields here
        })

        self.assertEqual(response.status_code, 201)  # Created
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(len(mail.outbox), 1)  # Confirm email sent

    def test_user_registration_missing_fields(self):
        response = self.client.post(reverse("register"), {
            "email": "newuser@example.com"
            # Missing username and password
        })

        self.assertEqual(response.status_code, 400)  # Bad Request

    def test_user_login(self):
        response = self.client.post(reverse("login"), {
            "username": "testuser",
            "password": "testpassword"
        })

        self.assertEqual(response.status_code, 200)  # OK

    def test_user_login_invalid_credentials(self):
        response = self.client.post(reverse("login"), {
            "username": "testuser",
            "password": "wrongpassword"
        })

        self.assertEqual(response.status_code, 401)  # Unauthorized

    def test_index_view(self):
        response = self.client.get(reverse("index"))
        self.assertEqual(response.status_code, 200)  # OK
