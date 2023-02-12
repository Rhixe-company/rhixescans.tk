from django.urls import path
from Comics.views import comics_views as views

app_name = 'comicx'

urlpatterns = [
    path('comics/', views.getComics, name="comicsapi"),
    path('bookmarks/', views.bookmarks, name="bookmarksapi"),
    path('bookmarks/<str:pk>/', views.bookmark, name="bookmarkapi"),
    path('crawl/', views.crawl, name="crawl"),
    path('genres/', views.getGenres, name="genresapi"),
    path('genres/<str:pk>/', views.getGenre, name="genreapi"),
    path('category/', views.getCategorys, name="categorysapi"),
    path('category/<str:pk>/', views.getCategory, name="categoryapi"),
    path('reviews/', views.getReviews, name="reviewsapi"),
    path('reviews/<str:pk>/', views.getReview, name="reviewapi"),
    path('comics/top/', views.getTopComics, name='top-comics'),
    path('comics/<str:pk>/', views.getComic, name="comicapi"),
    path('comics/create/', views.createComic, name="comic-create"),
    path('comics/upload/', views.uploadImage, name="image-upload"),
    path('like/', views.createComicLike, name="comic-like"),
    path('comics/update/<str:pk>/', views.updateComic, name="comic-update"),
    path('comics/delete/<str:pk>/', views.deleteComic, name="comic-delete"),
    path('chapters/', views.getChapters, name="chaptersapi"),
    path('chapters/<str:pk>/', views.getChapter, name="chapterapi"),
    path('chapters/create/', views.createChapter, name="chapter-create"),
    path('chapters/<str:pk>/reviews/', views.createChapterReview,
         name="chapter-create-review"),
    path('chapters/update/<str:pk>/', views.updateChapter, name="chapter-update"),
    path('chapters/delete/<str:pk>/', views.deleteChapter, name="chapter-delete"),

]
