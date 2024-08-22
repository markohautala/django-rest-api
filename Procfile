release: python manage.py makemigrations && python manage.py migrate
web: npm run build --prefix frontend && gunicorn restapi.wsgi
