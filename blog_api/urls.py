from .views import *
from django.urls import path
from . import views
app_name = 'blog_api'

urlpatterns = [
    path('comics/', PostList.as_view(), name='listpost'),
    path('comics/top/', views.getTopComics, name='top-comics'),
    path('comic/<str:pk>/', PostDetail.as_view(), name='detailpost'),
    path('chapters/', ChapterList.as_view(), name='listchapter'),
    path('chapter/<str:pk>/', ChapterDetail.as_view(), name='detailchapter'),
    path('search/', PostListDetailfilter.as_view(), name='searchpost'),
    path('genres/', views.getGenres, name="genresapi"),
    path('genres/<str:pk>/', views.getGenre, name="genreapi"),
    path('category/', views.getCategorys, name="categorysapi"),
    path('category/<str:pk>/', views.getCategory, name="categoryapi"),
    path('reviews/', views.getReviews, name="reviewsapi"),
    path('reviews/<str:pk>/', views.getReview, name="reviewapi"),
    # Post Admin URLs
    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/',
         AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
]
