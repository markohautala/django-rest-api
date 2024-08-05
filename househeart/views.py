from rest_framework import generics, permissions
from restapi.permissions import IsOwnerOrReadOnly
from .models import HouseHeart
from .serializers import HouseHeartSerializer


class HouseHeartList(generics.ListCreateAPIView):
    """
    List all househearts, or create a new househeart.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = HouseHeartSerializer

    def get_queryset(self):
        return HouseHeart.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HouseHeartDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a househeart instance.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
    serializer_class = HouseHeartSerializer
    queryset = HouseHeart.objects.all()