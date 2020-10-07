# Generated by Django 3.1.1 on 2020-10-06 09:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('seq', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('seq', models.AutoField(primary_key=True, serialize=False)),
                ('age', models.IntegerField()),
                ('gender', models.CharField(max_length=6)),
                ('name', models.CharField(max_length=10)),
                ('nationality', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exam.country')),
            ],
        ),
    ]