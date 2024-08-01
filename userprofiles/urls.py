from django.urls import path
from .views import UserProfileView  # Import UserProfileView

urlpatterns = [
    path('', UserProfileView.as_view(), name='home'),  # Add a URL pattern for the root path
    path('userprofile/', UserProfileView.as_view(), name='userprofile'),  # URL for user profiles
]