from django.urls import path
from . import views

urlpatterns = [
    path('househeart/', views.HouseHeartList.as_view(), name='househeart-list'),
    path('househeart/<int:pk>/', views.HouseHeartDetail.as_view(), name='househeart-detail'),
]
