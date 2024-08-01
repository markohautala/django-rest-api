from django.urls import path
from .views import UserProfileView  # Import the view

urlpatterns = [
    path('userprofiles/', UserProfileView.as_view(), name='userprofiles'),  # Map the URL to the view
]