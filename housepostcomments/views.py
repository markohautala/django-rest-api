from rest_framework import generics, permissions
from restapi.permissions import IsOwnerOrReadOnly
from .models import HousePostComment
from .serializers import HousePostCommentSerializer, CommentDetailSerializer


class HousePostCommentList(generics.ListCreateAPIView):
    """
    Handles GET (list all comments) and POST (create a new comment) requests.
    """
    serializer_class = HousePostCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = HousePostComment.objects.all()

    def perform_create(self, serializer):
        # Save the user who created the comment
        serializer.save(user=self.request.user)


class HousePostCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET (retrieve), PUT/PATCH (update), and DELETE (destroy) requests for a single comment.
    """
    serializer_class = CommentDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = HousePostComment.objects.all()
