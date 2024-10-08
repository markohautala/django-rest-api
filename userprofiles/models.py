from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    display_name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    profile_picture = CloudinaryField('profile_picture')
    location = models.CharField(max_length=255, blank=True)  # New location field

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return f"Profile of {self.user.username}"

# Create a user profile when a new user is created
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
