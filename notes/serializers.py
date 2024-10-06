# notes/serializers.py

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Note model.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request.user == obj.user

    class Meta:
        model = Note
        fields = '__all__'  # Or specify the fields explicitly
        read_only_fields = ('user',)  # User should not be modifiable by API clients

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user  # Set the user to the logged-in user
        return super().create(validated_data)
