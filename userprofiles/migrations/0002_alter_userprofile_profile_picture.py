# Generated by Django 4.2.11 on 2024-08-01 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(default='../bl9c2h1utow7uh2esydx', upload_to='profile_pics/'),
        ),
    ]
