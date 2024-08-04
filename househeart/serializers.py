from django.db.utils import IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import HouseHeart

class HouseHeartSerializer(serializers.ModelSerializer):
    """
    Serializer for the HouseHeart model, which manages the representation
    and validation of 'HouseHeart' instances. The serializer ensures that
    the unique constraint on 'poster' and 'housepost' is respected when creating
    or updating records.
    """
    poster = serializers.ReadOnlyField(source='poster.username')
    housepost = serializers.ReadOnlyField(source='housepost.house_title')  # Assuming you want to show the title of the house post

    class Meta:
        model = HouseHeart
        fields = ['id', 'timestamp_created', 'poster', 'housepost']

        def create(self, validated_data):
            try:
                return super().create(validated_data)
            except IntegrityError:
                raise ValidationError('You have already liked this post.')
