from django.contrib import admin
from django.urls import path, include
from .views import root_route

urlpatterns = [
    path('', root_route),  # Include the root_route view at the root URL
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),  # Include the URL patterns from the rest_framework app
    path('', include('userprofiles.urls')),  # Include the URL patterns from the userprofiles app
    path('', include('houseposts.urls')),  # Include the URL patterns from the houseposts app
    path('', include('housepostcomments.urls')),  # Include the URL patterns from the housepostcomments app
    path('', include('househearts.urls')),  # Include the URL patterns from the househearts app
    path('dj-rest-auth/', include('dj_rest_auth.urls')), # Include the URL patterns from the dj_rest_auth app
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')), # Include the URL patterns from the dj_rest_auth.registration app
    path('dj-rest-auth/', include('dj_rest_auth.urls')),  # Include the URL patterns from the dj_rest_auth app
]