from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Comics.models import *
from Comics.serializers import *


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                serializer = CustomUserSerializer(user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = CustomUserSerializer(user, many=False)

    data = request.data
    # user.first_name = data['first_name']
    user.user_name = data['user_name']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    chapters = user.chapter_set.all()
    serializer = UserSerializer(user, many=False)
    serializer1 = ChapterSerializer(chapters, many=True)
    context = {
        'user': serializer.data,
        'chapters': serializer1.data,
    }
    return Response(context)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = NewUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = NewUser.objects.get(id=pk)
    chapters = user.chapter_set.all()
    serializer = UserSerializer(user, many=False)
    serializer1 = ChapterSerializer(chapters, many=True)
    context = {
        'user': serializer.data,
        'chapters': serializer1.data,
    }
    return Response(context)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = NewUser.objects.get(id=pk)

    data = request.data

    # user.first_name = data['first_name']
    user.user_name = data['user_name']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = NewUser.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')
