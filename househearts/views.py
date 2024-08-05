from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from restapi.permissions import IsOwnerOrReadOnly
from .models import HouseHeart, HousePost
from .serializers import HouseHeartSerializer

class HouseHeartList(generics.ListCreateAPIView):
    """
    List all househearts, or create a new househeart.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = HouseHeartSerializer
    queryset = HouseHeart.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HouseHeartDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve, update or delete a househeart instance.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = HouseHeartSerializer
    queryset = HouseHeart.objects.all()
