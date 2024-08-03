from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HousePost
from .serializers import HousePostSerializer

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
