from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Country, Customer
from .serializers import CountrySerializer, CustomerSerializer

# Create your views here.
class CountryView(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CustomerView(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer