from django.contrib import admin
from django.urls import path, include  # Include the URL patterns from your app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('userprofiles.urls')),  # Include the URL patterns from the userprofiles app
]
