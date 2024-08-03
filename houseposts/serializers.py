from rest_framework import serializers
from .models import Post


class HousePostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def validate_house_image(self, value):
        if value.size > 1024 * 1024 * 2:  # 2MB limit for image size
            raise serializers.ValidationError('Image size too large - maxlimit is 2MB')
        if value.file.content_type not in ['image/jpeg', 'image/png']: # only JPEG and PNG allowed
            raise serializers.ValidationError('Image format not supported - only JPEG and PNG allowed')
        if value.house_image.width > 4000 or value.house_image.height > 4000: # 4000x4000 limit for image dimensions
            raise serializers.ValidationError('Image dimensions too large - maxlimit is 4000x4000')
        return value

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.user

    class Meta:
        model = Post
        fields = '__all__'
