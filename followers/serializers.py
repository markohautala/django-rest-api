from django.db import IntegrityError
from rest_framework import serializers
from .models import Follower

class FollowerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Follower model, which manages the representation
    and validation of 'Follower' instances. The serializer ensures that
    the unique constraint on 'user' and 'followed' is respected when creating
    or updating records.
    """
    user = serializers.ReadOnlyField(source='user.username')
    followed = serializers.PrimaryKeyRelatedField(queryset=Follower.objects.all())

    class Meta:
        model = Follower
        fields = ['id', 'created_at', 'user', 'followed']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError('You are already following this user.')