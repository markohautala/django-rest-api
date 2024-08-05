from django.urls import path
from . import views

urlpatterns = [
    path('househearts/', views.HouseHeartList.as_view(), name='househeart-list'),
    path('househearts/<int:pk>/', views.HouseHeartDetail.as_view(), name='househeart-detail'),
]