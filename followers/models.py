from django.db import models
from django.contrib.auth.models import User

class Follower(models.Model):
    """
    The Follower model tracks relationships between users where one user
    is following another. It has two fields:
    - 'user': the User who is following another User.
    - 'followed': the User who is being followed.

    The 'related_name' attributes are used to distinguish between the
    two User fields, as both reference the User model. The 'unique_together'
    constraint ensures that a user cannot follow the same user more than once.
    """
    user = models.ForeignKey(
        User, related_name='following', on_delete=models.CASCADE
    )
    followed = models.ForeignKey(
        User, related_name='followers', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'followed']

    def __str__(self):
        return f'{self.user} is following {self.followed}'
