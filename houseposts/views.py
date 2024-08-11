from django.db.models import Count
from rest_framework import generics, permissions, filters
from .models import HousePost
from .serializers import HousePostSerializer
from restapi.permissions import IsOwnerOrReadOnly

class HousePostList(generics.ListCreateAPIView):
    """
    List all houseposts, or create a new housepost.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = HousePostSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter] # Filter by ordering and search
    search_fields = ['house_title', 'description'] # Search by house_title and description
    ordering_fields = ['housepostcomments_count', 'househearts_count']

    def get_queryset(self):
        """
        Return a queryset of HousePost instances annotated with housepostcomments_count and househearts_count.
        """
        return HousePost.objects.annotate(
            housepostcomments_count=Count('housepostcomments', distinct=True),
            househearts_count=Count('househearts', distinct=True)
        ).order_by('-date_posted')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Corrected 'owner' to 'user'

class HousePostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a housepost instance.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = HousePostSerializer

    def get_queryset(self):
        """
        Return a queryset of HousePost instances annotated with housepostcomments_count and househearts_count.
        """
        return HousePost.objects.annotate(
            housepostcomments_count=Count('housepostcomments', distinct=True),
            househearts_count=Count('househearts', distinct=True)
        ).order_by('-date_posted')
