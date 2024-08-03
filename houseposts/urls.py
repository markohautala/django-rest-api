from django.urls import path
from . import views # import houseposts views

urlpatterns = [
    path('houseposts/', views.HousePostList.as_view(), name='housepost-list'),
]