# Generated by Django 4.1.3 on 2023-02-14 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Comics', '0003_alter_page_image_urls_alter_page_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='pages',
            field=models.ManyToManyField(blank=True, related_name='pages', to='Comics.page'),
        ),
    ]
