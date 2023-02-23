from .views import ComicViewSet, ChapterViewSet, PostListDetailfilter, GenreViewSet, CreatePost, AdminPostDetail, EditPost, DeletePost
from django.urls import path
from . import views
app_name = 'blog_api'

urlpatterns = [
    path(
        'comics/', ComicViewSet.as_view({'get': 'recent_comics'}), name="comics"),
    path(
        'bookmarks/', ComicViewSet.as_view({'get': 'bookmark_comics'}), name="bookamrks"),
    path(
        'bookmarks/<str:pk>/', ComicViewSet.as_view({'get': 'like'}), name="comics_like"),
    path('comic/<str:pk>/',
         ComicViewSet.as_view({'get': 'retrieve'}), name="comic"),
    path('chapters/',
         ChapterViewSet.as_view({'get': 'list'}), name="chapters"),
    path('chapter/<str:pk>/',
         ChapterViewSet.as_view({'get': 'retrieve'}), name="chapter"),
    path('comics/top/', views.getTopComics, name='top-comics'),
    path('comics/search/', PostListDetailfilter.as_view(), name='searchpost'),
    path('genres/', GenreViewSet.as_view({'get': 'list'}), name="genresapi"),
    path('genres/<str:pk>/',
         GenreViewSet.as_view({'get': 'retrieve'}), name="genreapi"),
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
