# Generated by Django 3.0.2 on 2023-10-20 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climate_wavers', '0007_auto_20231020_1801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
