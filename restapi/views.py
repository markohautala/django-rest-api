from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from .settings import (
    JWT_AUTH_COOKIE, JWT_AUTH_REFRESH_COOKIE, JWT_AUTH_SAMESITE,
    JWT_AUTH_SECURE,
)
from dj_rest_auth.views import LoginView

@api_view()
def root_route(request):
    return Response({
        "message": "Welcome to my Houseposts API!"
    })

@api_view(['POST'])
def logout_route(request):
    response = Response({"message": "Logged out successfully."})
    # Clear JWT cookies
    response.set_cookie(
        key=JWT_AUTH_COOKIE,
        value='',
        httponly=True,
        expires='Thu, 01 Jan 1970 00:00:00 GMT',
        max_age=0,
        samesite=JWT_AUTH_SAMESITE,
        secure=JWT_AUTH_SECURE,
    )
    response.set_cookie(
        key=JWT_AUTH_REFRESH_COOKIE,
        value='',
        httponly=True,
        expires='Thu, 01 Jan 1970 00:00:00 GMT',
        max_age=0,
        samesite=JWT_AUTH_SAMESITE,
        secure=JWT_AUTH_SECURE,
    )
    # Clear session cookie (if using session-based auth)
    response.delete_cookie('sessionid')

    return response


@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

class CustomLoginView(LoginView):
    def get(self, request, *args, **kwargs):
        return Response({"detail": "Method 'GET' not allowed."}, status=405)
