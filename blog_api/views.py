from django.shortcuts import get_object_or_404
from Comics.models import *
from .serializers import *
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from rest_framework import mixins


class GenreViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving genres.
    """
    queryset = Genre.objects.all()
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


class ComicViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving comics.
    """
    queryset = Comic.objects.all()
    serializer_class = ComicsSerializer

    def list(self, request):
        comics = Comic.objects.all().order_by('-updated')
        page = self.paginate_queryset(comics)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(comics, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Comic.objects.all()
        comic = get_object_or_404(queryset, slug=pk)
        chapters = comic.chapter_set.all().order_by('-name')
        serializer = ComicSerializer(comic)
        serializer1 = ChapterSerializer(chapters, many=True)
        context = {'comic': serializer.data, 'chapters': serializer1.data}
        return Response(context)


class ChapterViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving chapters.
    """
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def list(self, request):
        chapters = Chapter.objects.all().order_by('-updated')
        page = self.paginate_queryset(chapters)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(chapters, many=True)
        return Response(serializer.data)

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


class PostList(generics.ListAPIView):
    serializer_class = ComicsSerializer
    queryset = Comic.objects.all()


class PostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ComicSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Comic, slug=item)


class ChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()


class ChapterDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChapterSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Chapter, name=item)

# Comic Search


class PostListDetailfilter(generics.ListAPIView):

    queryset = Comic.objects.all()
    serializer_class = ComicsSerializer
    filter_backends = [filters.SearchFilter]
    # '^' Starts-with search.
    # '=' Exact matches.
    search_fields = ['^title']

# Comic Admin

# class CreatePost(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Comic.objects.all()
#     serializer_class = ComicSerializer


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


class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ComicSerializer
    queryset = Comic.objects.all()


class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ComicSerializer
    queryset = Comic.objects.all()


""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
