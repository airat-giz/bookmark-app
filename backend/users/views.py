from rest_framework import generics, views, permissions, status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from .models import CustomUser


class RegistrationView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomUserSerializer


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user = CustomUser.objects.filter(email=request.data['email']).first()
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(request.data['password']):
            raise AuthenticationFailed('Incorrect password!')

        refresh = RefreshToken.for_user(user)
        logged_user = CustomUserSerializer(user)
        user = JSONRenderer().render(logged_user.data)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user
            }, status=status.HTTP_200_OK)


class LogoutAndBlacklistRefreshTokenView(views.APIView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh_token'])
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
