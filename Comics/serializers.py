from rest_framework import serializers
from Comics.models import Comic, Chapter, Genre, Page, Categorys, Review


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('name')


class CategorysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorys
        fields = ('name')


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = ('id', 'name', 'comic', 'numPages')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('user', 'chapter', 'comic', 'id', 'text', 'rating')


class ComicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comic
        fields = ('id', 'title', 'description', 'images', 'rating', 'status', 'author', 'artist', 'released',
                  'serialization', 'numChapters', 'favourites', 'likes', 'like_count')


# class PageSerializer(ModelSerializer):
#     class Meta:
#         model = Page
#         fields = '__all__'


# class GenreSerializer(ModelSerializer):
#     class Meta:
#         model = Genre
#         fields = '__all__'


# class CategorysSerializer(ModelSerializer):
#     class Meta:
#         model = Categorys
#         fields = '__all__'


# class ChapterSerializer(ModelSerializer):
#     pages = serializers.SerializerMethodField(read_only=True)
#     comments = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Chapter
#         fields = '__all__'

#     def get_pages(self, obj):
#         pages = obj.pages.all()
#         serializer = PageSerializer(pages, many=True)
#         return serializer.data

#     def get_comments(self, obj):
#         comments = obj.comments.all()
#         serializer = ReviewSerializer(comments, many=True)
#         return serializer.data


# class ComicSerializer(ModelSerializer):
#     likes = serializers.SerializerMethodField(read_only=True)
#     favourites = serializers.SerializerMethodField(read_only=True)
#     genres = serializers.SerializerMethodField(read_only=True)
#     category = serializers.SerializerMethodField(read_only=True)
#     chapters = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Comic
#         fields = '__all__'

#     def get_genres(self, obj):
#         genres = obj.genres.all()
#         serializer = GenreSerializer(genres, many=True)
#         return serializer.data

#     def get_category(self, obj):
#         category = obj.category.all()
#         serializer = CategorysSerializer(category, many=True)
#         return serializer.data

#     def get_chapters(self, obj):
#         chapters = obj.chapter_set.all().order_by('-name')[:2]
#         serializer = ChapterSerializer(chapters, many=True)
#         return serializer.data

#     def get_likes(self, obj):
#         likes = obj.likes
#         serializer = UserSerializer(likes, many=True)
#         return serializer.data

#     def get_favourites(self, obj):
#         favourites = obj.favourites
#         serializer = UserSerializer(favourites, many=True)
#         return serializer.data
