# Utilise l'image de base Python 3.11
FROM python:3.11.4-slim

# Installe les dépendances système nécessaires pour OpenGL
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

RUN apt-get update && apt-get install python3-opencv -y

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Installe les dépendances du projet
RUN pip install --no-cache-dir -r requirements.txt

# Exécute la commande par défaut pour lancer l'application
CMD [ "python", "main.py" ]
