# Generated by Django 4.0.3 on 2022-03-13 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crags', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crag',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='route',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='sector',
            name='slug',
        ),
    ]
