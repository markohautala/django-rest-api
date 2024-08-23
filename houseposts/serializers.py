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
    house_image = serializers.ImageField()  # Make the image field required

    def validate_house_image(self, value):
        if value.size > 1024 * 1024 * 3:  # 3MB limit for image size
            raise serializers.ValidationError('Image size too large - max limit is 3MB')
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

    # def get_house_image(self, obj):
    #     # Return the URL of the house image
    #     return obj.house_image.url if obj.house_image else 'https://res.cloudinary.com/dtjbfg6km/image/upload/v1722598634/house-placeholder-image_vgm8en.png'

    class Meta:
        model = HousePost
        fields = '__all__'
        read_only_fields = ('housepostcomments_count', 'househearts_count')
