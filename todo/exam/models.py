from django.db import models

# Create your models here.
class Country(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Customer(models.Model):
    seq = models.AutoField(primary_key=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=6)
    name = models.CharField(max_length=10)
    nationality = models.ForeignKey(Country, on_delete=models.CASCADE)
