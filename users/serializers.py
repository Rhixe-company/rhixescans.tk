from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from users.models import NewUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    about = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'email', 'name', 'isAdmin', 'about',
                  'avatar']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_about(self, obj):
        return obj.about

    def get_avatar(self, obj):
        return obj.avatar

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.user_name

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'email', 'name', 'isAdmin', 'about',
                  'avatar', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class RefreshTokenObtainPairSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer().data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data
