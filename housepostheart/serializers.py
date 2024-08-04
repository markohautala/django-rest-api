from rest_framework import serializers
from .models import HousePostHeart

class HousePostHeartSerializer(serializers.ModelSerializer):
    """
    Serializer for the HousePostHeart model, which manages the representation
    and validation of 'HousePostHeart' instances. The serializer ensures that
    the unique constraint on 'poster' and 'housepost' is respected when creating
    or updating records.
    """
    poster = serializers.ReadOnlyField(source='poster.username')
    housepost = serializers.ReadOnlyField(source='housepost.house_title')  # Assuming you want to show the title of the house post

    class Meta:
        model = HousePostHeart
        fields = ['id', 'timestamp_created', 'poster', 'housepost']
