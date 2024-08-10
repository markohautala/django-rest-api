from django.urls import path
from .views import UserProfileList, UserProfileDetail

urlpatterns = [
    path('', UserProfileList.as_view(), name='userprofile-list'),  # Mapping root to the list view
    path('<int:pk>/', UserProfileDetail.as_view(), name='userprofile-detail'),
]
