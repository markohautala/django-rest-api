from django.urls import path
from . import views

urlpatterns = [
    path('', views.HouseHeartList.as_view(), name='househeart-list'),
    path('<int:pk>/', views.HouseHeartDetail.as_view(), name='househeart-detail'),
]
