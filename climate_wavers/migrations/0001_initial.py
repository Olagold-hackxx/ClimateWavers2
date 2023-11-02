# Generated by Django 3.2.8 on 2023-10-29 16:43

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, null=True, unique=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='profile_pic/')),
                ('bio', models.TextField(blank=True, max_length=160, null=True)),
                ('cover', models.ImageField(blank=True, null=True, upload_to='covers/')),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_superuser', models.BooleanField(default=False, null=True)),
                ('profession', models.CharField(blank=True, max_length=100, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('last_location', models.CharField(blank=True, max_length=255, null=True)),
                ('is_google_user', models.BooleanField(default=False, null=True)),
                ('is_redhat_user', models.BooleanField(default=False, null=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_twitter_user', models.BooleanField(default=False, null=True)),
                ('is_facebook_user', models.BooleanField(default=False, null=True)),
                ('is_staff', models.BooleanField(default=False, null=True)),
                ('is_active', models.BooleanField(default=True, null=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, null=True)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('content_text', models.TextField(blank=True, null=True)),
                ('content_image', models.ImageField(blank=True, null=True, upload_to='posts/')),
                ('comment_count', models.PositiveIntegerField(default=0)),
                ('category', models.CharField(choices=[('community', 'Community'), ('education', 'Education'), ('reports', 'Reports')], default='community', max_length=20)),
                ('creater', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='climate_wavers.user')),
                ('likers', models.ManyToManyField(blank=True, related_name='liked_posts', to='climate_wavers.User')),
                ('savers', models.ManyToManyField(blank=True, related_name='saved_posts', to='climate_wavers.User')),
            ],
            options={
                'db_table': 'post',
            },
        ),
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('followers', models.ManyToManyField(blank=True, related_name='following', to='climate_wavers.User')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to='climate_wavers.user')),
            ],
            options={
                'db_table': 'follower',
            },
        ),
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_valid', models.BooleanField(default=False)),
                ('refresh_token', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='token', to='climate_wavers.user')),
            ],
            options={
                'db_table': 'token',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_content', models.TextField(max_length=90)),
                ('comment_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('commenter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commenters', to='climate_wavers.user')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='climate_wavers.post')),
            ],
            options={
                'db_table': 'comment',
            },
        ),
    ]
