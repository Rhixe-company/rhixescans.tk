import scrapy


class ComicSpider(scrapy.Spider):
    name = 'comics'

    def start_requests(self):
        yield scrapy.Request('https://www.asurascans.com/manga/?page=1&order=update')

    def parse(self, response):
        for link in response.css('div.bsx a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_webtoon)

        next_page = response.css('a.r::attr(href)')
        yield from response.follow_all(next_page, self.parse)

    def parse_webtoon(self, response):
        title = response.css('h1.entry-title::text').get().strip()
        image = response.css('div.thumb img::attr(src)').get()
        rating = response.css('div.num::text').get().strip()
        try:
            description = [decription.strip() for decription in response.css(
                '[itemprop="description"] p::text').getall()]
        except:
            description = 'none'
        status = response.css('div.imptdt i::text').get().strip()
        author = response.css('.flex-wrap .fmed span::text')[1].get().strip()
        artist = response.css('.flex-wrap .fmed span::text')[2].get().strip()
        yield {'title': title, 'image': image, 'rating': rating,
               'description': description, 'status': status, 'author': author, 'artist': artist}
