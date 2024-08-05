from django.db.utils import IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import HouseHeart, HousePost

class HouseHeartSerializer(serializers.ModelSerializer):
    """
    Serializer for the HouseHeart model, which manages the representation
    and validation of 'HouseHeart' instances. The serializer ensures that
    the unique constraint on 'poster' and 'housepost' is respected when creating
    or updating records.
    """
    user = serializers.ReadOnlyField(source='user.username')
    housepost = serializers.PrimaryKeyRelatedField(queryset=HousePost.objects.all())

    class Meta:
        model = HouseHeart
        fields = ['id', 'timestamp_created', 'user', 'housepost']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError('You have already liked this post.')
