from django.urls import path
from . import views

urlpatterns = [
    path('', views.HousePostList.as_view(), name='housepost-list'),
    path('<int:pk>/', views.HousePostDetail.as_view(), name='housepost-detail'),
]
