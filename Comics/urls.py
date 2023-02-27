from django.urls import path
from . import views

app_name = 'Comics'

urlpatterns = [
    path('', views.index, name="index"),

    path('chapter/<str:str>/', views.chapter, name='chapter'),
    path('series/', views.series, name="series"),
    path('profile/', views.profile, name="profile"),
    path('login/', views.loginPage, name="login"),
    path('register/', views.registerPage, name="register"),
    path('logout/', views.logoutUser, name="logout"),
    path('comics/', views.adminComics, name="comics"),
    path('update_comic/<slug:slug>/', views.updateComic, name="update_comic"),
    path('<slug:post>/', views.comic, name='comic'),

]
