from pathlib import Path
import os
import dj_database_url  # Ensure dj_database_url is installed

if os.path.exists('env.py'):
    import env

# Cloudinary settings
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.environ.get('CLOUDINARY_API_KEY'),
    'API_SECRET': os.environ.get('CLOUDINARY_API_SECRET'),
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Media settings for Cloudinary storage
MEDIA_URL = 'https://res.cloudinary.com/{}/'.format(os.environ.get('CLOUDINARY_CLOUD_NAME'))


BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = os.getenv('SECRET_KEY')

# Debug mode based on environment
DEBUG = 'DEV' in os.environ

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    'housegram-rest-api-de7c6ab4d6fb.herokuapp.com'
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'dj_rest_auth.registration',
    'corsheaders',
    'django.contrib.messages',
    'rest_framework.authtoken',
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',
    'userprofiles',
    'houseposts',
    'househearts',
    'housepostcomments',
    'rest_framework',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'restapi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'restapi.wsgi.application'

DATABASES = {
    'default': (
        {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}
        if 'DEV' in os.environ
        else dj_database_url.parse(os.environ.get('DATABASE_URL'))
    )
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [(
            'rest_framework.authentication.SessionAuthentication'
            if 'DEV' in os.environ
            else 'dj_rest_auth.jwt_auth.JWTCookieAuthentication'
    )],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DATETIME_FORMAT': '%d %b %Y',
}

if 'DEV' not in os.environ:
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [
        'rest_framework.renderers.JSONRenderer',
    ]

REST_USE_JWT = True
REST_AUTH_SECURE = True
REST_AUTH_COOKIE = 'my-app-auth'
REST_AUTH_REFRESH_COOKIE = 'my-refresh-token'
JWT_AUTH_SAMESITE = 'None'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'restapi.serializers.CurrentUserSerializer'
}

CORS_ALLOW_CREDENTIALS = True

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

if 'CLIENT_ORIGIN' in os.environ:
    CORS_ALLOWED_ORIGINS = [os.environ.get('CLIENT_ORIGIN')]
else:
    CORS_ALLOWED_ORIGINS = ["http://localhost:8000", "http://127.0.0.1:8000"]
