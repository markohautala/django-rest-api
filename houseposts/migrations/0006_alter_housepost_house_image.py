# Generated by Django 5.1 on 2024-08-10 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('houseposts', '0005_alter_housepost_house_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='housepost',
            name='house_image',
            field=models.ImageField(blank=True, default='https://res.cloudinary.com/dtjbfg6km/image/upload/house-placeholder-image_vgm8en', upload_to='images/'),
        ),
    ]
