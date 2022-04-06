# Generated by Django 4.0.3 on 2022-04-06 12:33

import climbers.models
from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('climbers', '0006_user_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, default='profile_pic/profile_avatar.jpg', null=True, upload_to=climbers.models.upload_to, verbose_name='Image'),
        ),
    ]
