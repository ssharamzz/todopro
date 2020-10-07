from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.contrib.auth import get_user_model
from .models import TodoGroup, Todo, FavoriteGroup, Favorite
import re

class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username','email','phone_number'] #reg_user에서 필요한 정보만 추출(password 등은 안나오게 지정해줌)

class TodoGroupSerializer(ModelSerializer):
    class Meta:
        model = TodoGroup
        fields = '__all__'

class TodoSerializer(ModelSerializer):
    group_name = serializers.ReadOnlyField(source='group.name')

    class Meta:
        model = Todo
        # fields = ['seq', 'name', 'status'], 
        fields = '__all__'

class FavoriteGroupSerializer(ModelSerializer):
    class Meta:
        model = FavoriteGroup
        fields = '__all__'

class FavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'
       

