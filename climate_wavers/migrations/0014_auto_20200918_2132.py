# Generated by Django 3.0.8 on 2020-09-18 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climate_wavers', '0013_auto_20200902_1701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(default='no_pic.png', upload_to='profile_pic/'),
        ),
    ]
