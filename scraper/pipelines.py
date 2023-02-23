from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem
from itemadapter import ItemAdapter
from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page
from django.db.models import Q


class PricePipeline:

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        if adapter.get('title') and adapter.get('slug'):
            obj, created = ComicsManager.objects.filter(
                Q(title__icontains=item['title']) |
                Q(slug__icontains=item['slug'])
            ).update_or_create(image_url=item['image_url'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], created_by=item['created_by'], defaults={'title': item['title'], 'slug': item['slug']})
            obj2, created = Categorys.objects.filter(
                Q(name__icontains=item['category'])
            ).update_or_create(
                name=item['category'], defaults={'name': item['category']})
            obj.category.add(obj2)
            for genre in item['genres']:
                obj1, created = Genre.objects.filter(
                    Q(name__icontains=genre)
                ).update_or_create(
                    name=genre, defaults={'name': genre})
                obj.genres.add(obj1)
                obj.save()

            return item
        else:
            raise DropItem(f"Missing field in Comic:{item}")
# class PricePipeline:

#     existcomic = ComicsManager
#     existchapter = Chapter

#     def process_item(self, item, spider):
#         adapter = ItemAdapter(item)
#         comic = self.existcomic.objects.filter(
#             Q(title__icontains=adapter.get('title')) |
#             Q(slug__icontains=adapter.get('slug'))
#         )
#         if not comic:
#             if adapter.get('title') and adapter.get('slug'):
#                 obj, created = ComicsManager.objects.filter(
#                     Q(title__icontains=item['title']) |
#                     Q(slug__icontains=item['slug'])
#                 ).get_or_create(image=item['image'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], created_by=item['created_by'], defaults={'title': item['title'], 'slug': item['slug']})
#                 obj1, created = Genre.objects.filter(
#                     Q(name__icontains=item['genres'])
#                 ).get_or_create(
#                     name=item['genres'], defaults={'name': item['genres']})
#                 obj2, created = Categorys.objects.filter(
#                     Q(name__icontains=item['category'])
#                 ).get_or_create(
#                     name=item['category'], defaults={'name': item['category']})
#                 obj.category.add(obj2)
#                 obj.genres.add(obj1)
#                 obj.save()
#         else:
#             raise DropItem(f"Missing field in Comic:{item}")


# class MyImagesPipeline(ImagesPipeline):
#     def file_path(self, request, response=None, info=None, *, item=None):
#         image = request.url.split('/')[-1]
#         comic = item['title']
#         chapter = item['name']
#         return f'{comic}/{chapter}/{image}'

# class ScraperComicPipeline(object):

#     def process_item(self, item, spider):
#         adapter = ItemAdapter(item)
#         if adapter.get('title') and adapter.get('slug'):
        # obj, created = ComicsManager.objects.filter(
        #     Q(title__icontains=item['title']) |
        #     Q(slug__icontains=item['slug'])
        # ).get_or_create(image_urls=item['image_urls'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], created_at=item['created_at'], created_by=item['created_by'], updated_at=item['updated_at'], defaults={'title': item['title'], 'slug': item['slug']})
        # obj1, created = Genre.objects.filter(
        #     Q(name__icontains=item['genres'])
        # ).get_or_create(
        #     name=item['genres'], defaults={'name': item['genres']})
        # obj2, created = Categorys.objects.filter(
        #     Q(name__icontains=item['category'])
        # ).get_or_create(
        #     name=item['category'], defaults={'name': item['category']})
        # obj.category.add(obj2)
        # obj.genres.add(obj1)
        # obj.save()
#             # comic = ComicsManager.objects.filter(Q(title__icontains=item['title']) |
#             #                                      Q(slug__icontains=item['slug'])).get(slug=item['slug'])
#             # if comic:
        # obj3, created = Chapter.objects.filter(
        #     Q(name__icontains=item['name'])
        # ).get_or_create(comic=comic, name=item['name'], defaults={'name': item['name'], 'comic': comic})
        # obj4, created = Page.objects.filter(
        #     Q(image_urls__icontains=item['image_urls'])
        # ).get_or_create(image_urls=item['image_urls'], chapter=obj3, defaults={'chapter': obj3, 'image_urls': item['image_urls']})
        # obj3.pages.add(obj4)
        # obj3.numPages = obj3.page_set.all().count()
        # obj3.save()
        # comic.numChapters = comic.chapter_set.all().count()
        # comic.save()
#             return item
        # else:
        #     raise DropItem(f"Missing field in Comic:{item}")


# class ScraperChapterPipeline(object):

#     def process_item(self, item, spider):
#         adapter = ItemAdapter(item)
#         if adapter.get('title') and adapter.get('slug') and adapter.get('name'):
#             comic = ComicsManager.objects.filter(Q(title__icontains=item['title']) |
#                                                  Q(slug__icontains=item['slug'])).get(slug=item['slug'])
#             if comic:
#                 obj3, created = Chapter.objects.filter(
#                     Q(name__icontains=item['name'])
#                 ).get_or_create(comic=comic, name=item['name'], defaults={'name': item['name'], 'comic': comic})
#                 obj4, created = Page.objects.filter(
#                     Q(image_urls__icontains=item['image_urls'])
#                 ).get_or_create(image_urls=item['image_urls'], chapter=obj3, defaults={'chapter': obj3, 'image_urls': item['image_urls']})
#                 obj3.pages.add(obj4)
#                 obj3.numPages = obj3.page_set.all().count()
#                 obj3.save()
#                 comic.numChapters = comic.chapter_set.all().count()
#                 comic.save()
#                 return item
#         else:
#             raise DropItem(f"Missing field in Chapter: {item}")


# class MyImagesPipeline(ImagesPipeline):
#     def file_path(self, request, response=None, info=None, *, item=None):
#         # image_guid = hashlib.sha1(to_bytes(request.url)).hexdigest()
#         # return f'full/{image_guid}.jpg'
#         return request.url.split('/')[-1]

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
