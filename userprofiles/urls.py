from django.urls import path
from .views import UserProfileView, UserProfileDetailView  # Import UserProfileView and UserProfileDetailView


urlpatterns = [
    path('', UserProfileView.as_view(), name='home'),  # Add a URL pattern for the root path
    path('userprofile/', UserProfileView.as_view(), name='userprofile'),  # URL for user profiles
    path('userprofile/<int:pk>/', UserProfileDetailView.as_view(), name='userprofile-detail'),  # URL for user profile details
]
