from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Country, Customer

class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        # fields = '__all__'
        fields = ['seq', 'name']


class CustomerSerializer(ModelSerializer):
    # nationality = CountrySerializer(read_only=True)
    nationality_name = serializers.ReadOnlyField(source='nationality.name')

    class Meta:
        model = Customer
        # fields = '__all__'
        fields = ['seq', 'age', 'gender', 'name', 'nationality', 'nationality_name']