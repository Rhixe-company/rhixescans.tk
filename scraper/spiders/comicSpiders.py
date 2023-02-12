import scrapy


class ComicspidersSpider(scrapy.Spider):
    name = 'comicSpiders'
    clean_image_urls = []

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/')

    def parse(self, response):
        comic_page = response.css('.bsx a::attr(href)').getall()
        yield from response.follow_all(comic_page, self.parse_comics)

        next_page = response.css('a.r::attr(href)')
        yield from response.follow_all(next_page, self.parse)

    def parse_comics(self, response):
        title = response.css('.animefull .entry-title::text').get().strip()
        slug = response.css('.hentry ol li a::attr(href)')[
            1].get().split('/')[-2]
        image_urls = response.css('.animefull .wp-post-image::attr(src)').get()
        description = [des.strip() for des in response.css(
            '.animefull .entry-content p::text').getall()]
        rating = response.css('.animefull .imptdt i::text').get()
        status = response.css('.animefull .imptdt i::text').get()
        category = response.css('.animefull .imptdt a::text').get()
        released = response.css('.animefull .fmed span::text')[0].get().strip()
        author = response.css('.animefull .fmed span::text')[1].get().strip()
        artist = response.css('.animefull .fmed span::text')[2].get().strip()
        serialization = response.css('.animefull .fmed span::text')[
            3].get().strip()
        posted_by = response.css(
            '.animefull .fmed span.author i::text').get().strip()
        posted_on = response.css('.animefull .fmed span time::text')[
            0].get().strip()
        updated_on = response.css('.animefull .fmed span time::text')[
            0].get().strip()
        genres = response.css('.animefull .mgen a::text').getall()
        comic = (title, slug, image_urls, description, rating, status, category, released,
                 author, artist, serialization, posted_by, posted_on, updated_on, genres,)
        self.clean_image_urls.append(response.urljoin(image_urls))

        yield {
            'comic': comic,
            'image_urls': self.clean_image_urls
        }
        yield comic

        for link in response.css('ul.clstyle li a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_chapters)

    def parse_chapters(self, response):
        title = response.css('.hentry .allc a::text').get().strip()
        slug = response.css('.hentry .allc a::attr(href)').get().split('/')[-2]
        name = response.css('.hentry .entry-title::text').get().strip()
        pages = response.css(
            '.hentry .rdminimal p .size-full::attr(src)').getall()
        chapter = (title, slug, name, pages)

        for image_urls in pages:
            self.clean_image_urls.append(response.urljoin(image_urls))
            yield {
                'chapter': chapter,
                'image_urls': self.clean_image_urls
            }
