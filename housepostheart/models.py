from django.db import models
from django.contrib.auth.models import User
from houseposts.models import HousePost

class HousePostHeart(models.Model):
    """
    HousePostLike model, linked to a Poster (User) and a HousePost.
    This model ensures that a user cannot like the same post more than once.
    """
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    housepost = models.ForeignKey(HousePost, related_name='likes', on_delete=models.CASCADE)
    timestamp_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp_created']
        unique_together = ['poster', 'housepost']

    def __str__(self):
        return f'{self.poster} likes {self.housepost}'
