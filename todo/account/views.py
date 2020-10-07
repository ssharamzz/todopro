from django.shortcuts import render
from rest_framework.response import Response
from .serializers import SignupSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET','POST'])
def signUp(request):
    if request.method == 'POST':
        signup = SignupSerializer(data=request.data)
        if signup.is_valid():
            signup.save()
            return Response(signup.data, status=201)
