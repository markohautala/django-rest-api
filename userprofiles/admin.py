from django.contrib import admin
from .models import UserProfile

# displat the user profile in the admin panel
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name', 'date_created', 'date_updated')
    search_fields = ('user__username', 'display_name')

admin.site.register(UserProfile, UserProfileAdmin)