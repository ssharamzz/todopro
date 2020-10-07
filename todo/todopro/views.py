from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TodoGroup, Todo, FavoriteGroup, Favorite
from rest_framework.permissions import IsAuthenticated
from .serializers import TodoGroupSerializer, TodoSerializer, FavoriteGroupSerializer, FavoriteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
class TodoGroupView(ModelViewSet):
    queryset = TodoGroup.objects.all()
    serializer_class = TodoGroupSerializer

    # http://127.0.0.1:8000/api/study/students/?name=홍길동
    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     name = self.request.query_params.get('name')
    #     if name:
    #         qs = qs.filter(name=name)
    #     return qs
    
    # http://127.0.0.1:8000/api/study/students/incheon/
    # 함수명이 url
    # @action(detail=False, methods=['GET'])
    # def incheon(self, request):
    #     qs = self.get_queryset().filter(address__contains='인천') # like %인천%
    #     serializer = self.get_serializer(qs, many=True)
    #     return Response(serializer.data)

    # http://127.0.0.1:8000/api/study/students/7/init/
    # 7은 pk번호 넣는 부분, 입력받은 pk번호를 가지고 있는 학생의 주소와 이메일 정보가 초기화
    # @action(detail=True, methods=['PUT'])
    # def init(self, request, pk):
    #     instance = self.get_object()
    #     instance.address = ""
    #     instance.email = ""
    #     instance.save(update_fields=['address', 'email'])
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)


class TodoView(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        return qs

class FavoriteGroupView(ModelViewSet):
    queryset = FavoriteGroup.objects.all()
    serializer_class = FavoriteGroupSerializer



class FavoriteView(ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
def TodoStatusView(request):
    qs = Todo.objects.all()
    serializer = {"pending": "", "inprogress": "", "end": ""}
    serializer["pending"] = TodoSerializer(qs.filter(status="pending"), many=True)
    serializer["inprogress"] = TodoSerializer(qs.filter(status="inprogress"), many=True)
    serializer["end"] = TodoSerializer(qs.filter(status="end"), many=True)
    return Response({
        "pending": serializer["pending"].data,
        "inprogress": serializer["inprogress"].data,
        "end": serializer["end"].data
        })
