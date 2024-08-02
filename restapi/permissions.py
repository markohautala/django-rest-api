# permissions.py

from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the request method is considered "safe" (read-only).
        # SAFE_METHODS includes GET, HEAD, and OPTIONS.
        # If the request method is safe, allow the request.
        if request.method in permissions.SAFE_METHODS:
            return True

        # If the request method is not safe (i.e., it is a write operation like POST, PUT, PATCH, or DELETE),
        # only allow the request if the user making the request is the owner of the object. The user object is from the model in our database.
        return obj.user == request.user
