# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10.12-slim

EXPOSE 8001

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN apt-get update -y
RUN apt-get install -y python3-dev default-libmysqlclient-dev build-essential pkg-config
RUN pip3 install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY . /app

RUN /app/./make_migration.sh && /app/./migrate.sh

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
RUN chmod -R a+rwx /app

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["gunicorn", "--workers=3", "--bind=0.0.0.0:8001", "climate_configure.wsgi:application"]
