from django.urls import path
from housepostcomments import views

urlpatterns = [
    path('housepostcomments/', views.HousePostCommentList.as_view(), name='housepostcomment-list'),
    path('housepostcomments/<int:pk>/', views.HousePostCommentDetail.as_view(), name='housepostcomment-detail'),
]
