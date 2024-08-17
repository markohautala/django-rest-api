from django.contrib import admin
from django.urls import path, include
from .views import root_route, logout_route, CustomLoginView, set_csrf_token  # Import the new view

urlpatterns = [
    path('', root_route),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/logout/', logout_route),
    path('dj-rest-auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('userprofiles/', include('userprofiles.urls')),
    path('houseposts/', include('houseposts.urls')),
    path('housepostcomments/', include('housepostcomments.urls')),
    path('househearts/', include('househearts.urls')),
    path('admin/', admin.site.urls),
    path('set-csrf/', set_csrf_token),  # Add this line
]
