from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class HousePost(models.Model):
    """
    HousePost model, associated with 'user', i.e., a User instance.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    house_title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    house_image = CloudinaryField('house_image')

    class Meta:
        ordering = ['-date_posted']

    def __str__(self):
        return f'{self.id} {self.house_title}'
