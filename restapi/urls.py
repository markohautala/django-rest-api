from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import logout_route, CustomLoginView, set_csrf_token

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/logout/', logout_route),
    path('dj-rest-auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('userprofiles/', include('userprofiles.urls')),
    path('houseposts/', include('houseposts.urls')),
    path('notes/', include('notes.urls')),
    path('housepostcomments/', include('housepostcomments.urls')),
    path('househearts/', include('househearts.urls')),
    path('admin/', admin.site.urls),
    path('set-csrf/', set_csrf_token),
]

handler404 = TemplateView.as_view(template_name='index.html')
