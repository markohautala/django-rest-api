from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile  # Import the model here
from .serializers import UserProfileSerializer  # Import the serializer here

class UserProfileView(APIView):  # Renamed to avoid confusion with the model name
    def get(self, request):
        user_profiles = UserProfile.objects.all()  # Use the model's name to query
        # Serializing the queryset is necessary to return JSON responses
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)
