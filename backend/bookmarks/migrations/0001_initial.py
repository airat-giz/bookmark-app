# Generated by Django 3.2.4 on 2021-08-30 13:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookmarkTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=20, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Tag',
                'verbose_name_plural': 'Tags',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('url', models.CharField(max_length=1000, verbose_name='URL')),
                ('notes', models.CharField(blank=True, max_length=1000, verbose_name='Заметки')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='bookmarks.category', verbose_name='Категория')),
                ('tags', models.ManyToManyField(blank=True, related_name='bookmarks', to='bookmarks.BookmarkTag', verbose_name='Tags')),
            ],
            options={
                'verbose_name': 'Закладка',
                'verbose_name_plural': 'Закладки',
                'ordering': ['-date_added'],
            },
        ),
    ]
