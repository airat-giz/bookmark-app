from django.urls import path
from . import views


urlpatterns = [
    path('category/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),
    path('bookmark/', views.BookmarkList.as_view()),
    path('bookmark/<int:pk>/', views.BookmarkDetail.as_view()),
    path('tag/', views.TagList.as_view()),
    path('tag/<int:pk>/', views.TagDetail.as_view()),
]
