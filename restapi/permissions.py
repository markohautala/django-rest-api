# permissions.py

from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the request method is considered "safe" (read-only).
        if request.method in permissions.SAFE_METHODS:
            return True

        # If the request method is not safe, only allow the request if the user making the request is the owner of the object.
        return obj.poster == request.user

