from django.db import models
from django.contrib.auth.models import User

class HousePost(models.Model):
    """
    HousePost model, associated with 'user', i.e., a User instance.
    Default image set so that we can always reference image.url.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    house_title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    house_image = models.ImageField(
        upload_to='images/',
        default='house-placeholder-image_vgm8en',
        blank=True
    )

    class Meta:
        ordering = ['-date_posted']

    def __str__(self):
        return f'{self.id} {self.house_title}'
