from rest_framework import serializers
from Comics.models import *


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorys
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = ('category', 'id', 'title', 'images', 'slug', 'author',
                  'description', 'rating', 'genres', 'status', 'alternativetitle')


class ChapterSerializer(serializers.ModelSerializer):
    pages = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

    def get_pages(self, obj):
        pages = obj.page_set.all()
        serializer = PageSerializer(pages, many=True)
        return serializer.data

    def get_reviews(self, obj):
        reviews = obj.comments.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ComicSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only=True)
    genres = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comic
        fields = '__all__'

    def get_category(self, obj):
        category = obj.category.all()
        serializer = CategorySerializer(category, many=True)
        return serializer.data

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all().order_by('-name')
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data

    def get_genres(self, obj):
        genres = obj.genres.all()
        serializer = GenreSerializer(genres, many=True)
        return serializer.data


class ComicsSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only=True)
    genres = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comic
        fields = '__all__'

    def get_category(self, obj):
        category = obj.category.all()
        serializer = CategorySerializer(category, many=True)
        return serializer.data

    def get_genres(self, obj):
        genres = obj.genres.all()
        serializer = GenreSerializer(genres, many=True)
        return serializer.data

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all().order_by('-name')[:2]
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data
