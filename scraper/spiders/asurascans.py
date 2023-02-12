import scrapy
from Comics.models import ComicsManager, Genre, Categorys, Chapter, Page
from django.db.models import Q


class AsurascansSpider(scrapy.Spider):
    name = 'asurascans'

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/?page=1&order=update')

    def parse(self, response):
        for link in response.css('div.bsx a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_webtoon)

        next_page = response.css('a.r::attr(href)')
        yield from response.follow_all(next_page, self.parse)

    def parse_webtoon(self, response):
        title = response.css('h1.entry-title::text').get().strip()
        alternativetitle = response.css('.wd-full span::text').get()
        slug = response.css('div.bixbox ol li a::attr(href)')[
            1].get().split('/')[-2]
        image_urls = response.css('div.thumb img::attr(src)').get()
        rating = response.css('div.num::text').get().strip()
        try:
            description = [decription.strip() for decription in response.css(
                '[itemprop="description"] p::text').getall()]
        except:
            description = 'none'
        status = response.css('div.imptdt i::text').get().strip()
        released = response.css('.flex-wrap .fmed span::text')[0].get().strip()
        author = response.css('.flex-wrap .fmed span::text')[1].get().strip()
        artist = response.css('.flex-wrap .fmed span::text')[2].get().strip()
        serialization = response.css(
            '.flex-wrap .fmed span::text')[3].get().strip()

        obj, created = ComicsManager.objects.filter(
            Q(title__icontains=title) |
            Q(slug__icontains=slug)
        ).get_or_create(slug=slug, image_urls=image_urls,  rating=float(rating), status=status, description=description, released=released,  author=author,  artist=artist, alternativetitle=alternativetitle, serialization=serialization, defaults={'title': title, 'slug': slug})
        category = response.css('.imptdt a::text').get()
        obj2, created = Categorys.objects.filter(
            Q(name__icontains=category)
        ).get_or_create(
            name=category, defaults={'name': category})
        obj.category.add(obj2)
        genres_list = response.css('.mgen a::text').getall()
        for genre in genres_list:
            obj1, created = Genre.objects.filter(
                Q(name__icontains=genre)
            ).get_or_create(
                name=genre, defaults={'name': genre})

            obj.genres.add(obj1)
            obj.save()
        yield {

            'comic': obj,
            'category': obj2,
            'genres': obj1
        }

        # for link in response.css('ul.clstyle li a::attr(href)'):
        #     yield response.follow(link.get(), callback=self.parse_chapters)

        chapter_page = response.css('ul.clstyle li a::attr(href)').get()
        yield response.follow(chapter_page, callback=self.parse_chapters)

    def parse_chapters(self, response):
        slug = response.css('.allc a::attr(href)').get().split("/")[-2]
        title = response.css(".allc a::text").get().strip()
        name = response.css('.entry-title::text').get().strip()
        pages = response.css('.rdminimal img::attr(src)').getall()
        for img_url in pages:
            comic = ComicsManager.objects.filter(
                Q(title__icontains=title) |
                Q(slug__icontains=slug)).get(title=title)
            if comic:
                obj, created = Chapter.objects.filter(
                    Q(name__icontains=name)
                ).get_or_create(comic=comic, name=name, defaults={'name': name, 'comic': comic})
                obj1, created = Page.objects.filter(
                    Q(image_urls__icontains=img_url)
                ).get_or_create(image_urls=img_url, chapter=obj, defaults={'image_urls': img_url, 'chapter': obj})
                obj.pages.add(obj1)
                obj.numPages = obj.page_set.all().count()

                obj.save()
                obj.comic.save()
                comic.numChapters = comic.chapter_set.all().count()
                comic.save()
                yield {
                    'comic': comic,
                    'chapter': obj,
                    'page': obj1,
                }
            else:

                print(f'{title} not found in database')

        pass
