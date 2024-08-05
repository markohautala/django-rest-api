from rest_framework import generics, permissions
from restapi.permissions import IsOwnerOrReadOnly
from .models import Follower
from .serializers import FollowerSerializer

class FollowerList(generics.ListCreateAPIView):
    """
    Provides a list of all follower relationships where users follow other users.
    Allows authenticated users to create a new follower relationship, i.e., follow another user.
    During creation, the current logged-in user is automatically set as the follower.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowerDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieve details of a specific follower relationship.
    Does not support updates, as users can only follow or unfollow.
    Allows deletion of a follower relationship if the requesting user is the owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
