import scrapy
from scraper.items import ComicItem, ChapterItem
from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page
from django.db.models import Q


class WebtoonsSpider(scrapy.Spider):
    name = 'webtoons'

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/?page=1&order=update')

    def parse(self, response):
        for link in response.css('div.bsx a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_webtoon)

        next_page = response.css('a.r::attr(href)')
        yield from response.follow_all(next_page, self.parse)

    def parse_webtoon(self, response):
        item = ComicItem()
        item['title'] = response.css('h1.entry-title::text').get().strip(),
        item['slug'] = response.css('div.bixbox ol li a::attr(href)')[
            1].get().split('/')[-2],
        item['image'] = response.css('div.thumb img::attr(src)').get(),
        item['rating'] = float(response.css('div.num::text').get().strip())
        item['status'] = response.css('div.imptdt i::text').get().strip(),
        item['description'] = response.css(
            '[itemprop="description"] p::text').getall(),
        item['released'] = response.css(
            '.flex-wrap .fmed span::text')[0].get().strip(),
        item['author'] = response.css(
            '.flex-wrap .fmed span::text')[1].get().strip(),
        item['artist'] = response.css(
            '.flex-wrap .fmed span::text')[2].get().strip(),
        item['alternativetitle'] = response.css(
            '.wd-full span::text').get(),
        item['serialization'] = response.css(
            '.flex-wrap .fmed span::text')[3].get().strip()
        item['category'] = response.css('.imptdt a::text').get(),
        try:
            genres_list = response.css('.mgen a::text').getall()
        except:
            genres_list = ['none']
        for g in genres_list:
            genre = g
            item['genres'] = genre,
            yield item
            
        

        for link in response.css('ul.clstyle li a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_chapters)

    def parse_chapters(self, response):
        item = ChapterItem()
        item['title'] = response.css(".allc a::text").get().strip(),
        item['slug'] = response.css(
            '.allc a::attr(href)').get().split("/")[-2],
        item['name'] = response.css('.entry-title::text').get().strip()
        pages = response.css('.rdminimal img::attr(src)').getall()
        for img_url in pages:
            image = img_url
            item['image'] = image
            yield item
            comic = ComicsManager.objects.filter(
                Q(title__icontains=item['title']) |
                Q(slug__icontains=item['slug'])).get(title=item['title'])
            if comic:
                obj, created = Chapter.objects.filter(
                    Q(name__icontains=item['name'])
                ).get_or_create(comic=comic, name=item['name'], defaults={'name': item['name'], 'comic': comic})
                obj1, created = Page.objects.filter(
                    Q(images__icontains=item['image'])
                ).get_or_create(images=item['image'], chapter=obj, defaults={'images': item['image'], 'chapter': obj})
                obj.pages.add(obj1)
                obj.numPages = obj.page_set.all().count()
                obj.save()
                obj.comic.save()
                comic.numChapters = comic.chapter_set.all().count()
                comic.save()
            else:

                pass
