from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HousePost
from .serializers import HousePostSerializer
from restapi.permissions import IsOwnerOrReadOnly

class HousePostList(APIView):
    serializer_class = HousePostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        houseposts = HousePost.objects.all()
        serializer = HousePostSerializer(houseposts, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = HousePostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HousePostDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = HousePostSerializer

    def get_object(self, pk):
        try:
            housepost = HousePost.objects.get(pk=pk)  # Use correct variable name
            self.check_object_permissions(self.request, housepost)
            return housepost
        except HousePost.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        housepost = self.get_object(pk)
        serializer = HousePostSerializer(housepost, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        housepost = self.get_object(pk)
        serializer = HousePostSerializer(housepost, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        housepost = self.get_object(pk)
        housepost.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
