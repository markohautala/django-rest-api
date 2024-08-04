from rest_framework import generics, permissions
from restapi.permissions import IsOwnerOrReadOnly
from .models import HousePostComment
from .serializers import HousePostCommentSerializer, CommentDetailSerializer

# List takes care of GET requests, Create takes care of POST requests and create takes care of POST requests
class HousePostCommentList(generics.ListCreateAPIView):
  serializer_class = HousePostCommentSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Only authenticated users can create comments
  queryset = HousePostComment.objects.all() # Get all comments

  def perform_create(self, serializer):
    serializer.save(user=self.request.user) # Save the user who created the comment

# Detail takes care of GET, PUT and DELETE requests
class HousePostCommentDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = CommentDetailSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] # Only authenticated users can update or delete comments
  queryset = HousePostComment.objects.all() # Get all comments