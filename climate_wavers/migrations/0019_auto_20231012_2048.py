# Generated by Django 3.0.2 on 2023-10-12 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climate_wavers', '0018_auto_20231011_2336'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='last_location',
        ),
        migrations.AddField(
            model_name='user',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]