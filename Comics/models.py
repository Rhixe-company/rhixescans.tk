from django.db import models
from .managers import NewManager
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from io import BytesIO
from django.core import files
from requests_html import HTMLSession
from PIL import Image
# from django.db.models.signals import post_save
# from django.contrib.auth.models import User
# from django.dispatch import receiver
# from django.core.exceptions import ValidationError
# from django.core.files.images import get_image_dimensions


# def user_directory_path(instance, filename):
#     return 'users/avatars/{0}/{1}'.format(instance.user.id, filename)
s = HTMLSession()
headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0"
}


def comics_images_location(instance, filename):
    return '{}/{}'.format(str(instance.title).replace(" ", "_").replace(":", " ").replace("/", "").replace("\\", ""), filename)


def comics_chapters_images_location(instance, filename):
    return '{}/{}/{}'.format(str(instance.chapter.comic.title).replace(" ", "_").replace(":", " ").replace("/", "").replace("\\", ""),  instance.chapter.name, filename)


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     avatar = models.ImageField(
#         upload_to=user_directory_path, default='users/avatar.jpg')
#     bio = models.TextField(max_length=500, blank=True)

#     def clean(self):
#         if not self.avatar:
#             raise ValidationError("x")
#         else:
#             w, h = get_image_dimensions(self.avatar)
#             if w != 500:
#                 raise ValidationError("x")
#             if h != 500:
#                 raise ValidationError("x")

#     def __str__(self):
#         return self.user.username


# @ receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True, null=True)

    def __str__(self):
        return self.name


class Categorys(models.Model):
    name = models.CharField(max_length=100, unique=True, null=True)

    def __str__(self):
        return self.name


class Comic(models.Model):

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
    image_url = models.URLField(max_length=100000, null=True)
    image = models.ImageField(
        max_length=100000, upload_to=comics_images_location)

    rating = models.DecimalField(max_digits=9, decimal_places=1, blank=True)
    status = models.CharField(
        max_length=15, choices=options, default='Ongoing')
    author = models.CharField(max_length=100, blank=True, null=True)
    artist = models.CharField(max_length=100, blank=True, null=True)
    released = models.CharField(max_length=100, blank=True, null=True)
    serialization = models.CharField(max_length=1000, blank=True, null=True)
    numChapters = models.IntegerField(default=0, null=True, blank=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    genres = models.ManyToManyField(Genre, blank='True')
    category = models.ManyToManyField(Categorys)
    created_by = models.CharField(max_length=100, blank=True, null=True)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(default=timezone.now)
    favourites = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='favourite', blank=True,  default=None)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='like', default=None, blank=True)
    like_count = models.IntegerField(blank=True)
    objects = models.Manager()  # default manager
    newmanager = NewManager()

    class Meta:
        ordering = ['updated']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.image == '' and self.image_url != '':
            resp = s.get(self.image_url,  stream=True, headers=headers)
            pb = BytesIO()
            pb.write(resp.content)
            pb.flush()
            # pb = Image.open(BytesIO(resp.content))
            file_name = self.image_url.split("/")[-1]
            self.image.save(file_name, files.File(pb),
                            save=True)
            return super().save(*args, **kwargs)
        else:
            return print(self.title)

    # def save(self, *args, **kwargs):

    #     if self.images == '' and self.image_urls != '':
    #         resp = s.get(self.image_urls,  stream=True, headers=headers)
    #         orig_image = Image.open(BytesIO(resp.content))
    #         file_name = self.image_urls.split("/")[-1]
    #         self.images.save(file_name, files.File(orig_image),
    #                          save=True)
    #         return super().save(*args, **kwargs)
    #     else:
    #         pass


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
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)
    readers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name='reader')
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
        ordering = ['updated']

    def __str__(self):
        return self.name


class Page(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    image_urls = models.URLField(max_length=100000)
    images = models.ImageField(
        max_length=100000, upload_to=comics_chapters_images_location)
    # images = models.ImageField(
    #    upload_to=None, max_length=100000, height_field=None, width_field=None, null=True, blank=False)

    def __str__(self):
        return self.image_urls

    def save(self, *args, **kwargs):
        if self.images == '' and self.image_urls != '':

            resp = s.get(self.image_urls,  stream=True, headers=headers)
            pb = BytesIO()
            pb.write(resp.content)
            pb.flush()
            # pb = Image.open(BytesIO(resp.content))
            file_name = self.image_urls.split("/")[-1]
            self.images.save(file_name, files.File(pb),
                             save=True)
            return super().save(*args, **kwargs)
        else:
            return print(self.chapter.name)


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
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    chapter = models.ForeignKey(
        Chapter, on_delete=models.SET_NULL, null=True, related_name='comments')
    comic = models.ForeignKey(Comic, on_delete=models.SET_NULL, null=True)
    text = models.TextField(max_length=3000, null=False)
    rating = models.PositiveSmallIntegerField(
        choices=options, default=1)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['updated']

    def __str__(self):
        return self.text


class Likes(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_like')
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name='review_like')
    likes = models.PositiveIntegerField(default=0)
    unlikes = models.PositiveIntegerField(default=0)
