# Generated by Django 4.0.3 on 2022-03-26 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climbers', '0003_user_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ascending',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='climblist',
            name='created',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='created',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='userfollowing',
            name='created',
            field=models.DateField(auto_now_add=True),
        ),
    ]