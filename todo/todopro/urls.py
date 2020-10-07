from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('todo_group', views.TodoGroupView)
router.register('todos', views.TodoView)
router.register('fav_group', views.FavoriteGroupView)
router.register('favorites', views.FavoriteView)

urlpatterns = [
    path('', include(router.urls)),
    path('todo', views.TodoStatusView),

]
