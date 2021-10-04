# Generated by Django 3.2.4 on 2021-09-05 14:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bookmarks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookmark',
            name='author',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='users.customuser', verbose_name='Пользователь'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bookmarktag',
            name='author',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='users.customuser', verbose_name='Пользователь'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='category',
            name='author',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='users.customuser', verbose_name='Пользователь'),
            preserve_default=False,
        ),
    ]