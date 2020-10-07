from django.db import models

# Create your models here.
class TodoGroup(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    reg_date = models.DateField(auto_now_add=True)
    del_yn = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Todo(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    STATUS_CHOICES=(('pending', '할일'), ('inprogress', '진행중'), ('end', '완료')) # 상태를 셀렉트박스로 선택할 수 있도록
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    # status = models.CharField(max_length=10)
    reg_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True)
    del_yn = models.BooleanField(default=False)
    group = models.ForeignKey(TodoGroup, on_delete=models.CASCADE)

class FavoriteGroup(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    reg_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Favorite(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=100)
    memo = models.TextField()
    reg_date = models.DateField(auto_now_add=True)
    group = models.ForeignKey(FavoriteGroup, on_delete=models.CASCADE)
