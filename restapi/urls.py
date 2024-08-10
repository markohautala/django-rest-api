from django.contrib import admin
from django.urls import path, include
from .views import root_route

urlpatterns = [
    path('', root_route),  # Include the root_route view at the root URL
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),  # Include the URL patterns from the rest_framework app

    # Include the URL patterns from each app with unique prefixes
    path('userprofiles/', include('userprofiles.urls')),
    path('houseposts/', include('houseposts.urls')),
    path('housepostcomments/', include('housepostcomments.urls')),
    path('househearts/', include('househearts.urls')),

    # Include the URL patterns from the dj_rest_auth app
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
]
