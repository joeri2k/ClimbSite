# Generated by Django 4.0.3 on 2022-03-27 12:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('climbers', '0004_alter_ascending_date_alter_climblist_created_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='dob',
        ),
    ]