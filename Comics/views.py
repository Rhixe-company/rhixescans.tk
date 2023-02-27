from django.shortcuts import render, get_object_or_404, HttpResponseRedirect, redirect
from .models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages
from django.contrib.auth import logout, login, authenticate
from users.models import NewUser
from .forms import *
from django.contrib.auth.decorators import login_required


def index(request):
    posts = Comic.objects.all()
    comics = Comic.newmanager.filter(rating__gte=10.0).order_by('-title')
    page = request.GET.get('page', 1)

    paginator = Paginator(posts, 21)
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    context = {'posts': posts, 'comics': comics}
    return render(request, 'Comics/index.html', context)


def series(request):
    posts = Comic.objects.all()
    comics = Comic.newmanager.filter(rating__gte=10.0).order_by('-title')
    page = request.GET.get('page', 1)

    paginator = Paginator(posts, 21)
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    context = {'posts': posts, 'comics': comics}
    return render(request, 'Comics/series.html', context)


@login_required(login_url="Comics:index")
def comic(request, post):
    post = get_object_or_404(Comic, slug=post)
    chapters = post.chapter_set.all().order_by('-name')
    context = {'post': post, 'chapters': chapters}
    return render(request, 'Comics/comic.html', context)


@login_required(login_url="Comics:index")
def chapter(request, str):
    post = get_object_or_404(Chapter, name=str)
    pages = post.pages.all()
    chapters = post.comic.chapter_set.all().order_by('-name')
    context = {'post': post, 'pages': pages, 'chapters': chapters}
    return render(request, 'Comics/chapter.html', context)


@login_required(login_url="Comics:index")
def profile(request):
    user = request.user
    context = {'user': user}
    return render(request, 'Comics/profile.html', context)


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('Comics:index')

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Little Hack to work around re-building the usermodel
        try:
            user = NewUser.objects.get(email=email)
            user = authenticate(
                request, email=user.email,  password=password)
        except:
            messages.error(request, 'User with this email does not exists')
            return redirect('Comics:login')

        if user is not None:
            login(request, user)
            return redirect('Comics:index')
        else:
            messages.error(request, 'Email OR password is incorrect')

    context = {}
    return render(request, 'Comics/login.html', context)


def registerPage(request):
    form = CustomUserCreationForm()
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            messages.success(request, 'Account successfuly created!')

            user = authenticate(request, email=user.email,
                                password=request.POST['password1'])

            if user is not None:
                login(request, user)

            next_url = request.GET.get('next')
            if next_url == '' or next_url == None:
                next_url = 'Comics:index'
            return redirect(next_url)
        else:
            messages.error(request, 'An error has occured with registration')
    context = {'form': form}
    return render(request, 'Comics/register.html', context)


def logoutUser(request):
    logout(request)
    return redirect('Comics:index')


@login_required(login_url="Comics:index")
def adminComics(request):

    posts = Comic.objects.all()

    page = request.GET.get('page', 1)

    paginator = Paginator(posts, 21)
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    context = {'posts': posts}
    return render(request, 'Comics/adminComics.html', context)


@login_required(login_url="Comics:index")
def updateComic(request, slug):
    post = Comic.objects.get(slug=slug)
    form = ComicForm(instance=post)

    if request.method == 'POST':
        form = ComicForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            form.save()
        return redirect('Comics:comics')

    context = {'form': form}
    return render(request, 'Comics/comic_form.html', context)
