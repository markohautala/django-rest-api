from django.db import models
from django.contrib.auth.models import User
from houseposts.models import HousePost

class HouseHeart(models.Model):
    """
    HouseHeart model, linked to a User (User) and a HousePost.
    This model ensures that a user cannot like the same post more than once.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    housepost = models.ForeignKey(HousePost, related_name='househearts', on_delete=models.CASCADE)
    timestamp_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp_created']
        unique_together = ['user', 'housepost']

    def __str__(self):
        return f'{self.user} likes {self.housepost}'
