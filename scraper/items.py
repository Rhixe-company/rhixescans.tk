from scrapy.item import Field, Item
from itemloaders.processors import MapCompose, TakeFirst
from w3lib.html import remove_tags


def remove_white(value):
    return value.strip()


class ComicItem(Item):
    title = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    alternativetitle = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    slug = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    image_urls = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    description = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    rating = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    status = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    author = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    artist = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    released = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    created_at = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    created_by = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    updated_at = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    serialization = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())

    name = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    category = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    genres = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())


class ChapterItem(Item):
    slug = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    title = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    name = Field(input_processor=MapCompose(
        remove_tags, remove_white), output_processor=TakeFirst())
    image = Field(input_processor=MapCompose(
        remove_tags, remove_white))
