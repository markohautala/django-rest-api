from rest_framework import serializers
from housepostcomments.models import HousePostComment

class HousePostCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the HousePostComment model
    Adds extra fields related to user profile and housepost when returning a list of HousePostComment instances
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.userprofile.id')
    profile_image = serializers.ReadOnlyField(source='user.userprofile.profile_picture.url')
    housepost_title = serializers.ReadOnlyField(source='housepost.house_title')
    housepost_image = serializers.ReadOnlyField(source='housepost.house_image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = HousePostComment
        fields = '__all__'


class CommentDetailSerializer(HousePostCommentSerializer):
  """
  Serializer for the Comment model used in Detail view
  Post is a read only field so that we dont have to set it on each update
  """
  post = serializers.ReadOnlyField(source='post.id')
