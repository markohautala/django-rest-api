from django.urls import path
from housepostcomments import views

urlpatterns = [
    path('', views.HousePostCommentList.as_view(), name='housepostcomment-list'),
    path('<int:pk>/', views.HousePostCommentDetail.as_view(), name='housepostcomment-detail'),
]
