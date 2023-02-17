from django.http import JsonResponse
from django.shortcuts import HttpResponseRedirect, get_object_or_404, render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status, permissions
from Comics.models import Comic, Chapter, Page, Categorys, Genre, Review, ComicsManager
from Comics.serializers import ComicSerializer, ChapterSerializer, GenreSerializer, CategorysSerializer, ReviewSerializer, PageSerializer
from django.db.models import Q

from bs4 import BeautifulSoup
from requests_html import HTMLSession


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComicLike(request):
    result = ''
    id = int(request.POST.get('postid'))
    comic = get_object_or_404(Comic, id=id)
    if comic.likes.filter(id=request.user.id).exists():
        comic.likes.remove(request.user)
        comic.like_count -= 1
        result = comic.like_count

        serializer = ComicSerializer(data=comic)
        if serializer.is_valid():
            serializer.save()
    else:
        comic.likes.add(request.user)
        comic.like_count += 1
        result = comic.like_count
        serializer = ComicSerializer(data=comic)
        if serializer.is_valid():
            serializer.save()
    return Response({'result': result, 'comic': serializer.data})


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getComics(request):
    query = request.GET.get('keyword') if request.GET.get(
        'keyword') != None else ''
    comics = Comic.objects.filter(
        Q(title__icontains=query) |
        Q(alternativetitle__icontains=query) |
        Q(author__icontains=query) |
        Q(artist__icontains=query)
    )
    page = request.GET.get('page')
    paginator = Paginator(comics, 24)
    try:
        comics = paginator.page(page)
    except PageNotAnInteger:
        comics = paginator.page(1)
    except EmptyPage:
        comics = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    serializer = ComicSerializer(comics, many=True)

    context = {'comics': serializer.data,
               'page': page, 'pages': paginator.num_pages, 'comics_count':  paginator.count}
    return Response(context)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getGenres(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getGenre(request, pk):
    genre = Genre.objects.get(id=pk)
    comics = Comic.objects.filter(Q(genres__name__icontains=genre))
    serializer = GenreSerializer(genre, many=False)
    serializer1 = ComicSerializer(comics, many=True)
    context = {'genre': serializer.data, 'comics': serializer1.data}
    return Response(context)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReviews(request):
    comments = Review.objects.all()
    serializer = ReviewSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReview(request, pk):
    comment = Review.objects.get(id=pk)
    serializer = ReviewSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getCategorys(request):
    categorys = Categorys.objects.all()
    serializer = CategorysSerializer(categorys, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getCategory(request, pk):
    category = Categorys.objects.get(id=pk)
    comics = Comic.objects.filter(Q(category__name__icontains=category))
    serializer = CategorysSerializer(category, many=False)
    serializer1 = ComicSerializer(comics, many=True)
    context = {'category': serializer.data, 'comics': serializer1.data}
    return Response(context)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookmarks(request):
    comics = Comic.objects.filter(favourites=request.user)
    serializer = ComicSerializer(comics, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark(request, pk):
    comic = Comic.objects.get(id=pk)
    if comic.favourites.filter(id=request.user.id).exists():
        comic.favourites.remove(request.user)
        return Response('Comic Removed Successfully')

    else:
        comic.favourites.add(request.user)
        return Response('Comic Added Successfully')


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getTopComics(request):
    comics = Comic.objects.filter(rating__gte=10.0).order_by('title')
    serializer = ComicSerializer(comics, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([
    permissions.AllowAny
])
def getComic(request, pk):
    comic = Comic.objects.get(id=pk)
    chapters = comic.chapter_set.all().order_by('-name')
    serializer = ComicSerializer(comic, many=False)
    serializer1 = ChapterSerializer(chapters, many=True)
    return Response({'chapters': serializer1.data, 'comic': serializer.data})


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getChapters(request):
    query = request.GET.get('keyword') if request.GET.get(
        'keyword') != None else ''

    chapters = Chapter.objects.filter(
        name__contains=query).order_by('-updated')

    page = request.GET.get('page')
    paginator = Paginator(chapters, 50)
    try:
        chapters = paginator.page(page)
    except PageNotAnInteger:
        chapters = paginator.page(1)
    except EmptyPage:
        chapters = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    serializer = ChapterSerializer(chapters, many=True)

    context = {'chapters': serializer.data, 'chapters_count':  paginator.count,
               'page': page, 'pages': paginator.num_pages}
    return Response(context)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getChapter(request, pk):
    chapter = Chapter.objects.get(id=pk)
    comicId = chapter.comic
    comic = Comic.objects.get(title=comicId)
    chapters = chapter.comic.chapter_set.all().order_by('-name')
    pages = chapter.pages.all()
    serializer = ChapterSerializer(chapter, many=False)
    serializer1 = ComicSerializer(comic, many=False)
    serializer2 = ChapterSerializer(chapters, many=True)
    serializer3 = PageSerializer(pages, many=True)
    return Response({'chapter': serializer.data, 'images': serializer3.data, 'comic': serializer1.data, 'chapters': serializer2.data, })


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createComic(request):
    serializer = ComicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateComic(request, pk):
    data = request.data
    user = request.user
    comic = Comic.objects.get(id=pk)
    comic.user = user
    comic.title = data['title']
    comic.image_urls = data['image_urls']
    comic.rating = data['rating']
    comic.status = data['status']
    comic.description = data['description']
    comic.artist = data['artist']
    comic.author = data['author']
    comic.save()
    # comic.genres.add(data['genres'])

    serializer = ComicSerializer(comic, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteComic(request, pk):
    comic = Comic.objects.get(id=pk)
    comic.delete()
    return Response('comic Deleted')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data

    comicId = data['comiId']
    comic = Comic.objects.get(id=comicId)

    comic.image = request.FILES.get('image')
    comic.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createChapter(request):

    chapter = Chapter.objects.create(
        name="Sample Name",

    )
    serializer = ChapterSerializer(chapter, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateChapter(request, pk):
    data = request.data
    user = request.user
    chapter = Chapter.objects.get(id=pk)
    comic = chapter.comic

    chapter.name = data['name']
    chapter.user = user
    chapter.comic = comic
    chapter.numReviews = chapter.numReviews
    chapter.numPages = chapter.numPages
    chapter.pages = chapter.pages
    chapter.save()

    serializer = ChapterSerializer(chapter, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteChapter(request, pk):
    chapter = Chapter.objects.get(id=pk)
    chapter.delete()
    return Response('Chapter Deleted')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createChapterReview(request, pk):
    user = request.user
    chapter = Chapter.objects.get(id=pk)
    comic = Comic.objects.get(id=chapter.comic.id)
    data = request.data

    # 1 - Review already exists
    alreadyExists = chapter.comments.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Chapter already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            chapter=chapter,
            comic=comic,
            rating=data['rating'],
            text=data['text'],
        )
        chapter.readers.add(user)
        chapter.user = user
        chapter.comic.user = user
        reviews = chapter.comments.all()
        chapter.numReviews = len(reviews)
        chapter.comic.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        chapter.rating = total / chapter.numReviews
        chapter.save()
        chapter.comic.save()
        return Response('Review Added')


@api_view(['POST'])
@permission_classes([
    permissions.AllowAny
])
def crawl(request):
    s = HTMLSession()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0"}

    def request(x):
        url = f'https://www.asurascans.com/manga/?page={x}'
        r = s.get(url, headers=headers)
        soup = BeautifulSoup(r.content, features='lxml')
        content = soup.find_all('div', class_='bsx')
        return content

    def parse(articles):
        for item in articles:
            for link in item.find_all('a', href=True):
                links = link['href']
                r = s.get(links, headers=headers)
                soup = BeautifulSoup(r.content, features='lxml')
                title = soup.find("h1", class_="entry-title").text.strip()
                rating = float(soup.find("div", class_="num").text.strip())
                category = soup.find(
                    "div", class_='tsinfo').find("a").text.strip()
                image = soup.find("div", class_="thumb").find('img')['src']
                description = soup.find(
                    "div", class_='entry-content entry-content-single').find("p").text.strip()
                status = soup.find('div', class_='imptdt').find(
                    'i').text.strip()
                author = soup.find('span', class_='author').find(
                    'i').text.strip()
                released = soup.select('div.fmed')[0].find(
                    'span').text.strip()
                artist = soup.select('div.fmed')[1].find(
                    'span').text.strip()
                serialized = soup.select('div.fmed')[2].find(
                    'span').text.strip()
                created = soup.select('div.fmed')[4].find(
                    'time').text.strip()
                updated = soup.select('div.fmed')[5].find(
                    'time').text.strip()
                obj, created = ComicsManager.objects.filter(
                    Q(title__icontains=title)
                ).get_or_create(image_url=image, rating=rating, status=status, description=description,  author=author,  artist=artist, category=category, serialized=serialized, released=released, created=created, updated=updated, defaults={'title': title})
                print(f'{title} added')
                g = soup.select("span.mgen a")
                for genre in g:
                    genres = genre.text.strip()
                    obj1, created = Genre.objects.filter(
                        Q(name=genres)
                    ).get_or_create(
                        name=genres, defaults={'name': genres})
                    print(f'{genres} added')
                    obj.genres.add(obj1)
                    obj.save()

                chapters = soup.find_all("div", class_='chbox')
                for chapter in chapters:
                    for l in chapter.find_all('a', href=True):
                        page = l['href']
                        r = s.get(page, headers=headers)
                        soup = BeautifulSoup(r.content, features='lxml')
                        name = soup.find(
                            "h1", class_="entry-title").text.strip()
                        obj2, created = obj.chapter_set.filter(
                            Q(name=name)
                        ).get_or_create(comics=obj, name=name, defaults={'name': name})
                        print(f'{name} added')
                        posts = soup.select(
                            "div.rdminimal img")
                        for p in posts:
                            pages = p['src']
                            obj3, created = obj2.page_set.filter(
                                Q(images_url__icontains=pages)
                            ).get_or_create(images_url=pages, chapters=obj2, defaults={'images_url': pages, 'chapters': obj2})
                            obj2.pages.add(obj3)
                            obj2.numPages = obj2.page_set.all().count()
                            obj2.save()
                            obj.numChapters = obj.chapter_set.all().count()
                            obj.save()

    x = 1
    while True:
        print(f'Page {x}')
        articles = request(x)
        x = x+1

        if len(articles) != 0:
            webtoons = parse(articles)
            print(webtoons)
        else:
            break
    comics = Comic.objects.all()
    serializer = ComicSerializer(comics, many=True)
    return Response(serializer.data)
