from django.urls import path
from . import views

urlpatterns = [
    path('houseposts/', views.HousePostList.as_view(), name='housepost-list'),
    path('houseposts/<int:pk>/', views.HousePostDetail.as_view(), name='housepost-detail'),
]
