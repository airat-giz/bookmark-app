from rest_framework import serializers
from .models import Category, BookmarkTag, Bookmark
from users.models import CustomUser


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Category
        fields = ['id', 'title']


class BookmarkTagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = BookmarkTag
        fields = ['id', 'title']


class BookmarkSerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=True)
    tags = BookmarkTagSerializer(many=True, required=False)
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Bookmark
        fields = ['id', 'title', 'url', 'notes', 'author', 'category', 'tags', 'date_added']

    def create(self, validated_data):
        tags = validated_data.pop('tags')
        category = validated_data.pop('category')

        if 'id' in category.keys():
            c = Category.objects.get(id=category['id'])
            bookmark = Bookmark.objects.create(**validated_data, category=c)
        else:
            c = Category.objects.create(title=category['title'], author=validated_data['author'])
            bookmark = Bookmark.objects.create(**validated_data, category=c)

        for tag in tags:
            if 'id' in tag.keys():
                t = BookmarkTag.objects.get(id=tag['id'])
                bookmark.tags.add(t)
            else:
                t = BookmarkTag.objects.create(title=tag['title'], author=validated_data['author'])
                bookmark.tags.add(t)
        return bookmark

    def update(self, instance, validated_data):
        category = validated_data.pop('category')

        if 'id' in category.keys():
            c = Category.objects.get(id=category['id'])
            instance.category = c
        else:
            c = Category.objects.create(**category, author=validated_data['author'])
            instance.category = c

        instance.title = validated_data.get('title', instance.title)
        instance.url = validated_data.get('url', instance.url)
        instance.notes = validated_data.get('notes', instance.notes)

        tags = validated_data.pop('tags')
        tags_dict = dict((i.id, i) for i in instance.tags.all())

        for tag in tags:
            if 'id' in tag.keys():
                if tag['id'] in tags_dict.keys():
                    tags_dict.pop(tag['id'])
                t = BookmarkTag.objects.get(id=tag['id'])
                instance.tags.add(t)
            else:
                t = BookmarkTag.objects.create(title=tag['title'], author=validated_data['author'])
                instance.tags.add(t)
        if len(tags_dict) > 0:
            for tag in tags_dict.values():
                instance.tags.remove(tag)
        instance.save()
        return instance
