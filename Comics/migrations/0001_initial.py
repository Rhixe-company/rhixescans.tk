# Generated by Django 4.1.3 on 2023-02-25 00:18

import Comics.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000, null=True, unique=True)),
                ('rating', models.DecimalField(blank=True, decimal_places=1, max_digits=9, null=True)),
                ('numReviews', models.IntegerField(blank=True, default=0, null=True)),
                ('numPages', models.IntegerField(blank=True, default=0, null=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ['updated'],
            },
        ),
        migrations.CreateModel(
            name='Comic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=1000, null=True, unique=True)),
                ('alternativetitle', models.CharField(blank=True, max_length=1000, null=True)),
                ('slug', models.SlugField(max_length=1000, unique_for_date='created')),
                ('description', models.TextField(blank=True, null=True)),
                ('image_url', models.URLField(max_length=100000, null=True)),
                ('image', models.ImageField(max_length=100000, upload_to=Comics.models.comics_images_location)),
                ('rating', models.DecimalField(blank=True, decimal_places=1, max_digits=9)),
                ('status', models.CharField(choices=[('Completed', 'Completed'), ('Ongoing', 'Ongoing'), ('Dropped', 'Dropped'), ('Coming Soon', 'Coming Soon'), ('Hiatus', 'Hiatus')], default='Ongoing', max_length=15)),
                ('author', models.CharField(blank=True, max_length=100, null=True)),
                ('artist', models.CharField(blank=True, max_length=100, null=True)),
                ('released', models.CharField(blank=True, max_length=100, null=True)),
                ('serialization', models.CharField(blank=True, max_length=1000, null=True)),
                ('numChapters', models.IntegerField(blank=True, default=0, null=True)),
                ('numReviews', models.IntegerField(blank=True, default=0, null=True)),
                ('created_by', models.CharField(blank=True, max_length=100, null=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('like_count', models.IntegerField(blank=True)),
                ('category', models.ManyToManyField(to='Comics.categorys')),
                ('favourites', models.ManyToManyField(blank=True, default=None, related_name='favourite', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['updated'],
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=3000)),
                ('rating', models.PositiveSmallIntegerField(choices=[(1, '1 - Trash'), (2, '2 - Horrible'), (3, '3 - Terrible'), (4, '4 - Bad'), (5, '5 - OK'), (6, '6 - Watchable'), (7, '7 - Good'), (8, '8 - Very Good'), (9, '9 - Perfect'), (10, '10 - Master Piece')], default=1)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('chapter', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comments', to='Comics.chapter')),
                ('comic', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Comics.comic')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['updated'],
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_urls', models.URLField(max_length=100000)),
                ('images', models.ImageField(max_length=100000, upload_to=Comics.models.comics_chapters_images_location)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Comics.chapter')),
            ],
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('likes', models.PositiveIntegerField(default=0)),
                ('unlikes', models.PositiveIntegerField(default=0)),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review_like', to='Comics.review')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_like', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='comic',
            name='genres',
            field=models.ManyToManyField(blank='True', to='Comics.genre'),
        ),
        migrations.AddField(
            model_name='comic',
            name='likes',
            field=models.ManyToManyField(blank=True, default=None, related_name='like', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chapter',
            name='comic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Comics.comic'),
        ),
        migrations.AddField(
            model_name='chapter',
            name='pages',
            field=models.ManyToManyField(blank=True, related_name='pages', to='Comics.page'),
        ),
        migrations.AddField(
            model_name='chapter',
            name='readers',
            field=models.ManyToManyField(blank=True, related_name='reader', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chapter',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='ComicsManager',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('Comics.comic', models.Model),
        ),
    ]
