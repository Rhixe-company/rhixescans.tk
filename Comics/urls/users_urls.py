from django.urls import path
from Comics.views import users_views as views

app_name = 'users'

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('create/', views.registerUser, name='register'),
    path('', views.getUsers, name="users"),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
