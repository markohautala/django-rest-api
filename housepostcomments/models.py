from django.db import models
from django.contrib.auth.models import User
from houseposts.models import HousePost

class HousePostComment(models.Model):
    """
    HousePostComment model, linked to User and HousePost
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    housepost = models.ForeignKey(HousePost, on_delete=models.CASCADE)
    timestamp_created = models.DateTimeField(auto_now_add=True)
    timestamp_modified = models.DateTimeField(auto_now=True)
    comment = models.TextField()

    class Meta:
        ordering = ['-timestamp_created']

    def __str__(self):
        return self.comment[:50]  # Return the first 50 characters of the message
