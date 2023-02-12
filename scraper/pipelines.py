from scrapy.pipelines.images import ImagesPipeline
from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page
from django.db.models import Q


class ComicsPipeline:

    def __init__(self):
        self.comic = ComicsManager()
        self.genre = Genre()
        self.category = Categorys()
        self.chapter = Chapter()
        self.page = Page()

    def process_item(self, item, spider):
        obj, created = self.comic.objects.filter(
            Q(title__icontains=item['title']) |
            Q(slug__icontains=item['slug'])
        ).get_or_create(slug=item['slug'], image_urls=item['image_urls'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], defaults={'title': item['title'], 'slug': item['slug']})
        obj2, created = self.category.objects.filter(
            Q(name__icontains=item['category'])
        ).get_or_create(
            name=item['category'], defaults={'name': item['category']})
        obj1, created = self.genre.objects.filter(
            Q(name__icontains=item['genre'])
        ).get_or_create(
            name=item['genre'], defaults={'name': item['genre']})
        obj.category.add(obj2)
        obj.genres.add(obj1)
        obj.save()
        obj3, created = self.chapter.objects.filter(
            Q(name__icontains=item['name'])
        ).get_or_create(comic=obj, name=item['name'], defaults={'name': item['name'], 'comic': obj})
        obj4, created = self.page.objects.filter(
            Q(image_urls__icontains=item['image_urls'])
        ).get_or_create(image_urls=item['image_urls'], chapter=obj, defaults={'image_urls': item['image_urls'], 'chapter': obj3})
        obj3.pages.add(obj4)
        obj3.numPages = obj3.page_set.all().count()

        obj3.save()

        obj.numChapters = obj.chapter_set.all().count()
        obj.save()
        return item


class MyImagesPipeline(ImagesPipeline):
    def file_path(self, request, response=None, info=None, *, item=None):
        # image_guid = hashlib.sha1(to_bytes(request.url)).hexdigest()
        # return f'full/{image_guid}.jpg'
        return request.url.split('/')[-1]

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
# from itemadapter import ItemAdapter
# from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page
# from django.db.models import Q


# class ScraperPipeline:
#     def process_item(self, item, spider):
#         obj, created = ComicsManager.objects.filter(
#             Q(title__icontains=item['title']) |
#             Q(slug__icontains=item['slug'])
#         ).get_or_create(title=item['title'], slug=item['slug'], image=item['image'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], defaults={'title': item['title'], 'slug': item['slug']})
        # obj2, created = Categorys.objects.filter(
        #     Q(name__icontains=item['category'])
        # ).get_or_create(
        #     name=item['category'], defaults={'name': item['category']})
        # obj1, created = Genre.objects.filter(
        #     Q(name__icontains=item['genre'])
        # ).get_or_create(
        #     name=item['genre'], defaults={'name': item['genre']})

        # obj.category.add(obj2)
        # obj.genres.add(obj1)
        # obj.save()
#         return item

# class MyImagesPipeline(ImagesPipeline):

#     @classmethod
#     def from_settings(cls, settings):
#         store_uri = settings['IMAGES_STORE']
#         return cls(store_uri, settings=settings)

#     def file_path(self, request, response=None, info=None, *, item=None):
#         # image_guid = hashlib.sha1(to_bytes(request.url)).hexdigest()
#         # return f'full/{image_guid}.jpg'
#         image = request.url.split('/')[-1]
#         return image
