# Generated by Django 4.1.3 on 2023-02-14 14:04

import Comics.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Comics', '0002_alter_chapter_pages'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='image_urls',
            field=models.URLField(max_length=100000),
        ),
        migrations.AlterField(
            model_name='page',
            name='images',
            field=models.ImageField(blank=True, max_length=100000, upload_to=Comics.models.comics_chapters_images_location),
        ),
    ]