from django.urls import path
from .views import RegistrationView, LoginView, LogoutAndBlacklistRefreshTokenView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='registration'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutAndBlacklistRefreshTokenView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
