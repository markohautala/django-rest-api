from django.shortcuts import redirect
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from restapi.permissions import IsOwnerOrReadOnly  # Ensure you have this permission class

class NoteList(generics.ListCreateAPIView):
    """
    List all notes for the authenticated user, or create a new note.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Allow unauthenticated access for creating notes
    serializer_class = NoteSerializer

    def get_queryset(self):
        # Ensure that only the notes belonging to the authenticated user are accessible
        return Note.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            # Redirect to the login page if the user is not authenticated
            return redirect("/api-auth/login/?next=/notes/")

        # Proceed with the standard get behavior if the user is authenticated
        return super().get(request, *args, **kwargs)

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
