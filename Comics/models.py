from django.db import models
from users.models import NewUser
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db.models import Q
from io import BytesIO
from django.core import files
from requests_html import HTMLSession


def comics_images_location(instance, filename):
    return '{}/{}'.format(str(instance.title).replace(" ", "_").replace(":", " ").replace("/", "").replace("\\", ""), filename)


def comics_chapters_images_location(instance, filename):
    return '{}/{}/{}'.format(str(instance.chapter.comic.title).replace(" ", "_").replace(":", " ").replace("/", "").replace("\\", ""),  instance.chapter.name, filename)


s = HTMLSession()
headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0"
}


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True, null=True)

    def __str__(self):
        return self.name


class Categorys(models.Model):

    options = (
        ('Manhwa', 'Manhwa'),
        ('Manhua', 'Manhua'),

    )
    name = models.CharField(choices=options,
                            max_length=100, default='Manhwa')

    def __str__(self):
        return self.name


class Comic(models.Model):

    class NewManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(Q(status='Completed') |
                                                  Q(status='Ongoing'))

    options = (
        ('Completed', 'Completed'),
        ('Ongoing', 'Ongoing'),
        ('Dropped', 'Dropped'),
        ('Coming Soon', 'Coming Soon'),
        ('Hiatus', 'Hiatus'),
    )

    title = models.CharField(max_length=1000, unique=True, null=True)
    alternativetitle = models.CharField(max_length=1000, blank=True, null=True)
    slug = models.SlugField(max_length=1000, unique_for_date='created')
    description = models.TextField(blank=True, null=True)
    # image = models.ImageField(
    #    upload_to=None, max_length=100000, default='placeholder.png', height_field=None, width_field=None)
    image_urls = models.URLField(max_length=100000, blank=True)
    image = models.ImageField(
        upload_to=comics_images_location, max_length=100000,
        blank=True)
    rating = models.DecimalField(max_digits=9, decimal_places=1, blank=True)
    status = models.CharField(
        max_length=15, choices=options, default='Ongoing')
    author = models.CharField(max_length=100, blank=True, null=True)
    artist = models.CharField(max_length=100, blank=True, null=True)
    released = models.CharField(max_length=100, blank=True, null=True)
    serialization = models.CharField(max_length=1000, blank=True, null=True)
    numChapters = models.IntegerField(default=0, blank=True)
    # genres = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)
    # category = models.ForeignKey(
    #     Categorys, on_delete=models.SET_NULL, null=True, blank='False')
    genres = models.ManyToManyField(Genre)
    category = models.ManyToManyField(Categorys)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(default=timezone.now)
    favourites = models.ManyToManyField(
        NewUser, related_name='favourite', blank=True,  default=None)
    likes = models.ManyToManyField(
        NewUser, related_name='like', default=None, blank=True)
    like_count = models.BigIntegerField(default=0, blank=True)
    objects = models.Manager()  # default manager
    newmanager = NewManager()

    class Meta:
        ordering = ('updated', 'title')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):

        if self.image == '' and self.image_urls != '':
            resp = s.get(self.image_urls,  stream=True, headers=headers)
            pb = BytesIO()
            pb.write(resp.content)
            pb.flush()
            file_name = self.image_urls.split("/")[-1]
            self.image.save(file_name, files.File(pb),
                            save=True)
            return super().save(*args, **kwargs)


class NewManager(models.Manager):
    pass


class ExtraManagers(models.Model):
    secondary = NewManager()

    class Meta:
        abstract = True


class ComicsManager(Comic, ExtraManagers):

    objects = NewManager()

    class Meta:

        proxy = True

    def do_something(self):
        pass


class Chapter(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.SET_NULL, null=True)
    readers = models.ManyToManyField(
        NewUser, blank=True, related_name='readers')
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000, unique=True, null=True)
    pages = models.ManyToManyField('Page', blank=True, related_name='pages')
    rating = models.DecimalField(
        max_digits=9, decimal_places=1, null=True, blank=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    numPages = models.IntegerField(default=0, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('-name',)

    def __str__(self):
        return self.name


class Page(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    image_urls = models.URLField(max_length=100000, blank=False, null=False)
    image = models.ImageField(
        upload_to=comics_chapters_images_location, max_length=100000, blank=True)
    # images = models.ImageField(
    #    upload_to=None, max_length=100000, height_field=None, width_field=None, null=True, blank=False)

    def __str__(self):
        return self.image_urls

    def save(self, *args, **kwargs):

        if self.image == '' and self.image_urls != '':
            resp = s.get(self.image_urls,  stream=True, headers=headers)
            pb = BytesIO()
            pb.write(resp.content)
            pb.flush()
            file_name = self.image_urls.split("/")[-1]
            self.image.save(file_name, files.File(pb),
                            save=True)
            return super().save(*args, **kwargs)


class Review(models.Model):
    options = ((1, '1 - Trash'),
               (2, '2 - Horrible'),
               (3, '3 - Terrible'),
               (4, '4 - Bad'),
               (5, '5 - OK'),
               (6, '6 - Watchable'),
               (7, '7 - Good'),
               (8, '8 - Very Good'),
               (9, '9 - Perfect'),
               (10, '10 - Master Piece'),)
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    chapter = models.ForeignKey(
        Chapter, on_delete=models.SET_NULL, null=True, related_name='comments')
    comic = models.ForeignKey(Comic, on_delete=models.SET_NULL, null=True)
    text = models.TextField(max_length=3000, null=False)
    rating = models.PositiveSmallIntegerField(
        choices=options, default=1)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.text


class Likes(models.Model):
    user = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name='user_like')
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name='review_like')
    likes = models.PositiveIntegerField(default=0)
    unlikes = models.PositiveIntegerField(default=0)
