from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    houseposts_count = serializers.IntegerField(read_only=True)
    profile_picture = serializers.ImageField() # Make the image field required

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('houseposts_count',)
