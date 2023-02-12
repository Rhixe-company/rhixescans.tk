from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from scrapy.utils.log import configure_logging
from scraper import settings as my_settings
from scraper.spiders.asurascans import AsurascansSpider

class Command(BaseCommand):
    help = 'Release spider'

    def handle(self, *args, **options):
        configure_logging()
        crawler_settings = Settings()
        crawler_settings.setmodule(my_settings)

        process = CrawlerProcess(settings=crawler_settings)

        process.crawl(AsurascansSpider)
        process.start()
