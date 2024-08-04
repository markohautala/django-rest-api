from django.contrib import admin
from django.urls import path, include  # Include the URL patterns from your app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),  # Include the URL patterns from the rest_framework app
    path('', include('userprofiles.urls')),  # Include the URL patterns from the userprofiles app
    path('', include('houseposts.urls')),  # Include the URL patterns from the houseposts app
    path('', include('housepostcomments.urls')),  # Include the URL patterns from the housepostcomments app
]
