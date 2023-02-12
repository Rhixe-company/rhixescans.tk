from rest_framework import serializers
from users.models import NewUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = NewUser
        fields = ('id', 'email', 'user_name', 'password', 'isAdmin')
        extra_kwargs = {'password': {'write_only': True}}

    def get_isAdmin(self, obj):
        return obj.is_staff

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(CustomUserSerializer):

    class Meta:
        model = NewUser
        fields = ('id', 'email', 'user_name', 'about',
                  'avatar', 'isAdmin', )
