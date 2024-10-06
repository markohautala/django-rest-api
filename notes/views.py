# notes/views.py

from django.db.models import Count
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from restapi.permissions import IsOwnerOrReadOnly  # Ensure you have this permission class

class NoteList(generics.ListCreateAPIView):
    """
    List all notes, or create a new note.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.all().order_by('-date_created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Save the logged-in user as the note owner

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a note instance.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.all()
