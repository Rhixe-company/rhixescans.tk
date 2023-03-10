from django.shortcuts import get_object_or_404
from Comics.models import *
from Comics.pagination import CustomPagination
from .serializers import *
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from rest_framework import mixins
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createChapterReview(request, pk):
    user = request.user
    chapter = Chapter.objects.get(name=pk)
    comic = Comic.objects.get(id=chapter.comic.id)
    data = request.data

    # 1 - Review already exists
    alreadyExists = chapter.comments.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Chapter already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            chapter=chapter,
            comic=comic,
            rating=data['rating'],
            text=data['text'],
        )
        chapter.readers.add(user)
        chapter.user = user
        chapter.comic.user = user
        reviews = chapter.comments.all()
        chapter.numReviews = len(reviews)
        chapter.comic.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        chapter.rating = total / chapter.numReviews
        chapter.save()
        chapter.comic.save()
        return Response('Review Added')


def get_permissions(self):
    """
    Instantiates and returns the list of permissions that this view requires.
    """
    if self.action == 'list':
        permission_classes = [IsAuthenticated]
    else:
        permission_classes = [IsAdminUser]
    return [permission() for permission in permission_classes]


class GenreViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving genres.
    """

    serializer_class = GenreSerializer

    def list(self, request):
        genres = Genre.objects.all().order_by('name')
        page = self.paginate_queryset(genres)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(genres, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Genre.objects.all()
        genre = get_object_or_404(queryset, pk=pk)
        comics = Comic.objects.filter(Q(genres__name__icontains=genre))
        serializer = GenreSerializer(genre)
        serializer1 = ComicSerializer(comics, many=True)
        context = {'genre': serializer.data, 'comics': serializer1.data}
        return Response(context)


class ComicViewSet(generics.ListAPIView):
    """
    A simple ViewSet for listing or retrieving comics.
    """
    queryset = Comic.objects.all()
    serializer_class = ComicsSerializer
    pagination_class = CustomPagination

    # @action(detail=False)
    # def get_queryset(self, request):
    #     # comics = Comic.objects.all().order_by('updated')
    #     comics = Comic.objects.all().order_by('-updated')
    #     page = self.paginate_queryset(comics)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(comics, many=True)
    #     return Response(serializer.data)

    # @action(detail=False)
    # def retrieve(self, request, pk=None):
    #     queryset = Comic.objects.all()
    #     comic = get_object_or_404(queryset, slug=pk)
    #     chapters = comic.chapter_set.all().order_by('-name')
    #     serializer = ComicSerializer(comic)
    #     serializer1 = ChapterSerializer(chapters, many=True)
    #     context = {'comic': serializer.data, 'chapters': serializer1.data}
    #     return Response(context)

    # @action(detail=False)
    # def like(self, request, pk=None):
    #     queryset = Comic.objects.all()
    #     comic = get_object_or_404(queryset, slug=pk)
    #     serializer = ComicSerializer(comic)
    #     if comic.favourites.filter(id=request.user.id).exists():
    #         comic.favourites.remove(request.user)
    #         context = {

    #             'status': 'Comic Removed from Favourite',
    #             'data': serializer.data,
    #         }
    #         return Response(context)
    #     else:
    #         comic.favourites.add(request.user)
    #         context = {

    #             'status': 'Comic Added to Favourite',
    #             'data': serializer.data,
    #         }
    #         return Response(context)

    # @action(detail=False)
    # def bookmark_comics(self, request):
    #     comics = Comic.objects.filter(favourites=request.user)
    #     page = self.paginate_queryset(comics)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(comics, many=True)
    #     return Response(serializer.data)


class ChapterViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving chapters.
    """

    serializer_class = ChapterSerializer

    @permission_classes([AllowAny])
    @action(detail=False)
    def list(self, request):
        chapters = Chapter.objects.all().order_by('-updated')
        page = self.paginate_queryset(chapters)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(chapters, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    @action(detail=False)
    def retrieve(self, request, pk=None):
        queryset = Chapter.objects.all()
        chapter = get_object_or_404(queryset, name=pk)
        pages = chapter.page_set.all()
        serializer = ChapterSerializer(chapter)
        serializer1 = PageSerializer(pages, many=True)
        context = {'chapter': serializer.data, 'pages': serializer1.data}
        return Response(context)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def getReviews(request):
    comments = Review.objects.all()
    serializer = ReviewSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def getReview(request, pk):
    comment = Review.objects.get(id=pk)
    serializer = ReviewSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getCategorys(request):
    categorys = Categorys.objects.all()
    serializer = CategorySerializer(categorys, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getCategory(request, pk):
    category = Categorys.objects.get(id=pk)
    comics = Comic.objects.filter(Q(category__name__icontains=category))
    serializer = CategorySerializer(category, many=False)
    serializer1 = ComicSerializer(comics, many=True)
    context = {'category': serializer.data, 'comics': serializer1.data}
    return Response(context)


@api_view(['GET'])
def getTopComics(request):
    comics = Comic.objects.filter(rating__gte=10.0).order_by('-title')
    serializer = ComicSerializer(comics, many=True)
    return Response(serializer.data)


class PostListDetailfilter(generics.ListAPIView):

    queryset = Comic.objects.all().order_by('title')
    serializer_class = ComicsSerializer
    filter_backends = [filters.SearchFilter]
    # '^' Starts-with search.
    # '=' Exact matches.
    search_fields = ['^title']


class CreatePost(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = ComicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminPostDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ComicSerializer
    queryset = Comic.objects.all()


class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ComicSerializer
    queryset = Comic.objects.all()
