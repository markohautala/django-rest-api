from rest_framework import serializers
from .models import HousePost

class HousePostSerializer(serializers.ModelSerializer):
    poster = serializers.ReadOnlyField(source='poster.username')
    is_poster = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='poster.profile.id')
    profile_image = serializers.ReadOnlyField(source='poster.profile.image.url')

    def validate_house_image(self, value):
        if value.size > 1024 * 1024 * 2:  # 2MB limit for image size
            raise serializers.ValidationError('Image size too large - max limit is 2MB')
        if value.content_type not in ['image/jpeg', 'image/png']:  # only JPEG and PNG allowed
            raise serializers.ValidationError('Image format not supported - only JPEG and PNG allowed')
        if value.image.width > 4000 or value.image.height > 4000:  # 4000x4000 limit for image dimensions
            raise serializers.ValidationError('Image dimensions too large - max limit is 4000x4000')
        return value

    def get_is_poster(self, obj):
        request = self.context.get('request')
        return request.user == obj.poster

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['poster'] = request.user
        return super().create(validated_data)

    class Meta:
        model = HousePost
        fields = '__all__'
