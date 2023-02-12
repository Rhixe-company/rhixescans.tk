from django.urls import path
from . import views


app_name = 'users'

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='login'),

    path('create/', views.CustomUserCreate.as_view(), name="create_user"),


    path('', views.getUsers, name="users"),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),


    path('<str:pk>/', views.getUserById, name='user'),


    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),


]
