from django.contrib import admin
from django.urls import path, include
from .views import root_route, logout_route

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', root_route),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # Ensure the logout route is included before the default dj-rest-auth urls
    path('dj-rest-auth/logout/', logout_route),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('userprofiles/', include('userprofiles.urls')),
    path('houseposts/', include('houseposts.urls')),
    path('housepostcomments/', include('housepostcomments.urls')),
    path('househearts/', include('househearts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
