#!/bin/sh
python manage.py migrate
uwsgi --http 0.0.0.0:8000 --chdir /app --wsgi-file backend/wsgi.py --master --processes 4 --threads 2