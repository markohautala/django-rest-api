from rest_framework import serializers
from .models import UserProfile
from followers.models import Follower

class UserProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    def get_following_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(user=user, followed=obj.user).first()
            return following.id if following else None
        return None

    class Meta:
        model = UserProfile
        fields = '__all__'