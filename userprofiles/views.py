from django.db.models import Count
from rest_framework import generics, filters
from .models import UserProfile
from .serializers import UserProfileSerializer
from restapi.permissions import IsOwnerOrReadOnly

class UserProfileList(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.annotate(
        houseposts_count=Count('user__housepost', distinct=True)
    )
    filter_backends = [filters.OrderingFilter]  # Enable ordering in the django-rest-framework API view
    ordering_fields = ['date_created', 'houseposts_count']
    ordering = ['-houseposts_count']  # Default ordering

    def get_queryset(self):
        return self.queryset

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)
