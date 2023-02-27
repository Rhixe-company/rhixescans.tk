import scrapy

from scraper.items import ComicItem


class ComicSpider(scrapy.Spider):
    name = 'comic'
    start_urls = [
        'https://www.asurascans.com/manga/1672760368-wandering-warrior-of-wudang/']

    async def parse(self, response):
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
        for link in response.css('ul.clstyle li a::attr(href)'):
            yield response.follow(link.get(), callback=self.parse_chapters)
        # chapter_page = response.css('ul.clstyle li a::attr(href)').get()
        # if chapter_page is not None:
        #     yield response.follow(chapter_page, callback=self.parse_chapters)

    async def parse_chapters(self, response):
        item = ComicItem()
        item['title'] = response.css('.hentry .allc a::text').get().strip()
        item['slug'] = response.css(
            '.hentry .allc a::attr(href)').get().split('/')[-2]
        item['name'] = response.css('.hentry .entry-title::text').get().strip()
        item['image_urls'] = response.css(
            '.hentry .rdminimal p .size-full::attr(src)').getall()
        yield item
