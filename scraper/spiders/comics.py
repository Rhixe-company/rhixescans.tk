import scrapy
from Comics.models import ComicsManager, Chapter, Page, Genre, Categorys
from django.db.models import Q
from scraper.items import ComicItem


class ComicsSpider(scrapy.Spider):
    name = 'comics'

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/?page=1&order=update')

    def parse(self, response):
        for link in response.css('.bsx a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_webtoon)
        for next_page in response.css('a.r::attr(href)'):
            yield response.follow(next_page.get(), callback=self.parse)

    async def parse_webtoon(self, response):
        item = ComicItem()
        item['title'] = response.css(
            '.animefull .entry-title::text').get().strip()
        item['slug'] = response.css('.hentry ol li a::attr(href)')[
            1].get().split('/')[-2]
        item['alternativetitle'] = response.css('.wd-full span::text').get()
        item['image_url'] = response.css(
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
        item['category'] = response.css('.imptdt a::text').get()
        item['genres'] = response.css('.mgen a::text').getall()
        yield item

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
        item['image_urls'] = response.css(
            '.hentry .rdminimal p .size-full::attr(src)').getall()
        yield item
        comic = ComicsManager.objects.filter(Q(title__icontains=item['title']) |
                                             Q(slug__icontains=item['slug'])).get(title=item['title'])
        if comic:
            obj3, created = Chapter.objects.filter(
                Q(name__icontains=item['name'])
            ).update_or_create(comic=comic,  defaults={'name': item['name']})
            for img in item['image_urls']:
                obj4, created = Page.objects.filter(
                    Q(image_urls__icontains=img)
                ).update_or_create(chapter=obj3, defaults={'image_urls': img})
                obj3.pages.add(obj4)
                obj3.numPages = obj3.page_set.all().count()
                obj3.save()
            comic.numChapters = comic.chapter_set.all().count()
            comic.save()
