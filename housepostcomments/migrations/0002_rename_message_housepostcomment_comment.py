# Generated by Django 4.2.11 on 2024-08-05 18:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('housepostcomments', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='housepostcomment',
            old_name='message',
            new_name='comment',
        ),
    ]
