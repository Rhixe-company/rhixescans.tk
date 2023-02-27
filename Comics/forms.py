from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import *
from users.models import NewUser


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = NewUser
        fields = ['user_name', 'email', 'first_name',
                  'about', 'avatar', 'password1', 'password2']


class ComicForm(ModelForm):
    class Meta:
        model = Comic
        fields = '__all__'

        widgets = {
            'genres': forms.CheckboxSelectMultiple(),
            'category': forms.CheckboxInput(),
        }


class ChapterForm(ModelForm):
    class Meta:
        model = Chapter
        fields = '__all__'

        widgets = {
            'pages': forms.CheckboxSelectMultiple(),

        }
