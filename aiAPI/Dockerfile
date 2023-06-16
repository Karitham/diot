# Utilise l'image de base Python 3.11
FROM python:3.11.4-slim

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Installe les dépendances système nécessaires pour OpenGL
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copie le fichier des dependences
COPY requirements.txt .

# Installe les dépendances du projet
RUN pip install --no-cache-dir -r requirements.txt

# Copie les fichiers de l'hôte vers le conteneur
COPY . .

# Exécute la commande par défaut pour lancer l'application
CMD [ "python", "-u", "main.py" ]
