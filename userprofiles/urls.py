from django.urls import path
from .views import UserProfileList, UserProfileDetail

urlpatterns = [
    path('', UserProfileList.as_view(), name='home'),  # Add a URL pattern for the root path
    path('userprofile/', UserProfileList.as_view(), name='userprofile-list'),
    path('userprofile/<int:pk>/', UserProfileDetail.as_view(), name='userprofile-detail'),
]
