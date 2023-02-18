import scrapy
from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page, Comic
from django.db.models import Q
from scraper.items import ComicItem


class ComicSpider(scrapy.Spider):
    name = 'comic'

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/1672760368-wandering-warrior-of-wudang/')

    async def parse(self, response):
        item = ComicItem()
        item['title'] = response.css(
            '.animefull .entry-title::text').get().strip()
        item['slug'] = response.css('.hentry ol li a::attr(href)')[
            1].get().split('/')[-2]
        item['alternativetitle'] = response.css('.wd-full span::text').get()
        item['image_urls'] = response.css(
            '.animefull .wp-post-image::attr(src)').get()
        item['description'] = [des.strip() for des in response.css(
            '.animefull .entry-content p::text').getall()]
        item['rating'] = float(response.css(
            '.animefull .num::text').get().strip())
        item['status'] = response.css('.animefull .imptdt i::text').get()
        item['released'] = response.css('.animefull .fmed span::text')[
            0].get().strip()
        item['author'] = response.css('.animefull .fmed span::text')[
            1].get().strip()
        item['artist'] = response.css('.animefull .fmed span::text')[
            2].get().strip()
        item['serialization'] = response.css(
            '.animefull .fmed span::text')[3].get().strip()
        item['created_by'] = response.css(
            '.animefull .fmed span.author i::text').get().strip()

        yield item

        obj, created = ComicsManager.objects.filter(
            Q(title__icontains=item['title']) |
            Q(slug__icontains=item['slug'])
        ).get_or_create(image_urls=item['image_urls'],  rating=item['rating'], status=item['status'], description=item['description'], released=item['released'],  author=item['author'],  artist=item['artist'], alternativetitle=item['alternativetitle'], serialization=item['serialization'], created_by=item['created_by'], defaults={'title': item['title'], 'slug': item['slug']})
        category = response.css('.imptdt a::text').get()
        obj2, created = Categorys.objects.filter(
            Q(name__icontains=category)
        ).get_or_create(
            name=category, defaults={'name': category})
        obj.category.add(obj2)
        for genre in response.css('.mgen a::text').getall():
            obj1, created = Genre.objects.filter(
                Q(name__icontains=genre)
            ).get_or_create(
                name=genre, defaults={'name': genre})
            obj.genres.add(obj1)
            obj.save()

        # for link in response.css('ul.clstyle li a::attr(href)'):
        #     yield response.follow(link.get(), callback=self.parse_chapters)

        chapter_page = response.css('ul.clstyle li a::attr(href)').get()
        yield response.follow(chapter_page, callback=self.parse_chapters)

    async def parse_chapters(self, response):
        item = ComicItem()
        item['title'] = response.css('.hentry .allc a::text').get().strip()
        item['slug'] = response.css(
            '.hentry .allc a::attr(href)').get().split('/')[-2]
        item['name'] = response.css('.hentry .entry-title::text').get().strip()

        yield item
        comic = ComicsManager.objects.filter(Q(title__icontains=item['title']) |
                                             Q(slug__icontains=item['slug'])).get(title=item['title'])
        obj3, created = Chapter.objects.filter(
            Q(name__icontains=item['name'])
        ).get_or_create(comic=comic, name=item['name'], defaults={'name': item['name'], 'comic': comic})
        for img_url in response.css(
                '.hentry .rdminimal p .size-full::attr(src)').getall():
            obj4, created = Page.objects.filter(
                Q(image_urls__icontains=img_url)
            ).get_or_create(image_urls=img_url, chapter=obj3, defaults={'chapter': obj3, 'image_urls': img_url})
            obj3.pages.add(obj4)
            obj3.numPages = obj3.page_set.all().count()
            obj3.save()
            comic.numChapters = comic.chapter_set.all().count()
            comic.save()
