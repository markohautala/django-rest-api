from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile  # Import the model here
from .serializers import UserProfileSerializer  # Import the serializer here

class UserProfileView(APIView):  # Renamed to avoid confusion with the model name
    def get(self, request):
        user_profiles = UserProfile.objects.all()  # Use the model's name to query
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)

class UserProfileDetailView(APIView):  # Renamed to avoid confusion with the model name
    serializer_class = UserProfileSerializer
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)  # primary key (pk) is used to query a single instance
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user_profile = self.get_object(pk)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

    def put(self, request, pk):
        user_profile = self.get_object(pk)
        serializer = UserProfileSerializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)