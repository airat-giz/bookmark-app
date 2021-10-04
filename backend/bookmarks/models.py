from django.db import models
from users.models import CustomUser


class Category(models.Model):
    title = models.CharField(max_length=20, verbose_name='Название')
    author = models.ForeignKey(CustomUser, null=False, blank=False, on_delete=models.CASCADE,
                              verbose_name='Пользователь', related_name='categories')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'
        ordering = ['title']


class BookmarkTag(models.Model):
    title = models.CharField(max_length=20, null=False, blank=True, verbose_name='Название')
    author = models.ForeignKey(CustomUser, null=False, blank=False, on_delete=models.CASCADE,
                              verbose_name='Пользователь', related_name='tags')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Tags'
        verbose_name = 'Tag'
        ordering = ['title']


class Bookmark(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False, verbose_name='Название')
    url = models.CharField(max_length=1000, null=False, blank=False, verbose_name='URL')
    notes = models.CharField(max_length=1000, null=False, blank=True, verbose_name='Заметки')
    author = models.ForeignKey(CustomUser, null=False, blank=False, on_delete=models.CASCADE,
                               verbose_name='Пользователь', related_name='bookmarks')
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.CASCADE,
                                 verbose_name='Категория', related_name='bookmarks')
    tags = models.ManyToManyField(BookmarkTag, blank=True, verbose_name='Tags', related_name='bookmarks')
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_added']
        verbose_name = 'Закладка'
        verbose_name_plural = 'Закладки'

