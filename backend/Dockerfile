# Use the official Python image as a base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install uwsgi
RUN pip install uwsgi

# Copy the project files
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["uwsgi", "--http", "0.0.0.0:8000", "--chdir", "/app", "--wsgi-file", "backend/wsgi.py", "--master", "--processes", "4", "--threads", "2"]
