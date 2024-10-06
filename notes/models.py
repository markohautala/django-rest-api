from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    """
    Note model, associated with a 'user', i.e., a User instance.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Associate note with a user
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    url = models.URLField(blank=True, max_length=200)  # Optional URL field

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return f'{self.id} {self.title}'

