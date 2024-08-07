# houseposts/serializers.py
from rest_framework import serializers
from .models import HousePost
from househearts.models import HouseHeart

class HousePostSerializer(serializers.ModelSerializer):
    """
    Serializer for the HousePost model with additional fields.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    househeart_id = serializers.SerializerMethodField()
    housepostcomments_count = serializers.IntegerField(read_only=True)
    househearts_count = serializers.IntegerField(read_only=True)

    def validate_house_image(self, value):
        if value.size > 1024 * 1024 * 2:  # 2MB limit for image size
            raise serializers.ValidationError('Image size too large - max limit is 2MB')
        if value.content_type not in ['image/jpeg', 'image/png']:  # only JPEG and PNG allowed
            raise serializers.ValidationError('Image format not supported - only JPEG and PNG allowed')
        if value.image.width > 4000 or value.image.height > 4000:  # 4000x4000 limit for image dimensions
            raise serializers.ValidationError('Image dimensions too large - max limit is 4000x4000')
        return value

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request.user == obj.user

    def get_househeart_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            househeart = HouseHeart.objects.filter(
                user=user, housepost=obj
            ).first()
            return househeart.id if househeart else None
        return None

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)

    class Meta:
        model = HousePost
        fields = '__all__'
        read_only_fields = ('housepostcomments_count', 'househearts_count')
