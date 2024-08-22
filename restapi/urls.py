from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import logout_route, CustomLoginView, set_csrf_token

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/api-auth/', include('rest_framework.urls')),
    path('api/dj-rest-auth/logout/', logout_route),
    path('api/dj-rest-auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/userprofiles/', include('userprofiles.urls')),
    path('api/houseposts/', include('houseposts.urls')),
    path('api/housepostcomments/', include('housepostcomments.urls')),
    path('api/househearts/', include('househearts.urls')),
    path('admin/', admin.site.urls),
    path('api/set-csrf/', set_csrf_token),
]

handler404 = TemplateView.as_view(template_name='index.html')