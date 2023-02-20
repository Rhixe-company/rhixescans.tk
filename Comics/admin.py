from django.contrib import admin
from .models import Comic, Chapter, Page, Genre, Review, Likes, Categorys
from . import models
# Site Styling.
admin.site.site_header = "Rhixescans Admin"
admin.site.site_title = "Rhixescans Admin Area"
admin.site.index_title = "Welcome to the Rhixescans admin area"

# Site models.


class PageInline(admin.TabularInline):
    model = Page
    extra = 3


class ReviewInline(admin.TabularInline):
    model = Review


class ChapterInline(admin.TabularInline):
    model = Chapter
    extra = 1


@admin.register(models.Comic)
class ComicAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'id', 'slug', 'author', 'rating')
    prepopulated_fields = {'slug': ('title',), }


class ChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'comic', 'id', 'numPages')
    inlines = [PageInline, ReviewInline]


admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Page)
admin.site.register(Genre)
admin.site.register(Categorys)
admin.site.register(Review)
admin.site.register(Likes)
