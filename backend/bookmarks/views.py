from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthor
from .serializers import CategorySerializer, BookmarkTagSerializer, BookmarkSerializer
from .models import Category, BookmarkTag, Bookmark


class CategoryList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(author=self.request.user)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthor, IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(author=self.request.user)


class BookmarkList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        return Bookmark.objects.filter(author=self.request.user)


class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthor, IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(author=self.request.user)


class TagList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BookmarkTagSerializer

    def get_queryset(self):
        return BookmarkTag.objects.filter(author=self.request.user)


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkTagSerializer
    permission_classes = [IsAuthor, IsAuthenticated]

    def get_queryset(self):
        return BookmarkTag.objects.filter(author=self.request.user)
