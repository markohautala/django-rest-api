# notes/views.py

from django.db.models import Count
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from restapi.permissions import IsOwnerOrReadOnly  # Ensure you have this permission class

class NoteList(generics.ListCreateAPIView):
    """
    List all notes for the authenticated user, or create a new note.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = NoteSerializer

    def get_queryset(self):
        # Filter notes to return only those belonging to the logged-in user
        return Note.objects.filter(user=self.request.user).order_by('-date_created')

    def perform_create(self, serializer):
        # Save the logged-in user as the note owner
        serializer.save(user=self.request.user)

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a note instance.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = NoteSerializer

    def get_queryset(self):
        # Ensure that only the notes belonging to the authenticated user are accessible
        return Note.objects.filter(user=self.request.user)
