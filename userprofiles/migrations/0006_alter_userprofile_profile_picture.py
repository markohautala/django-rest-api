# Generated by Django 5.1 on 2024-08-11 12:44

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0005_alter_userprofile_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='profile_picture'),
        ),
    ]