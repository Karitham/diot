import sys
sys.path.append("./Redis")

from redisClient import RedisClient
import json

# Création d'une instance du client Redis
redis_client = RedisClient()

# Établir une connexion à Redis
r = redis_client.connection()

# Données JSON à publier
data = {
    'id': 1,
    'temperature': 25.5,
    'humidity': 60.2,
    'co2': 800,
    'motion': False
    }

# Convertir les données en format JSON
json_data = json.dumps(data)

# Publier les données JSON sur le canal "donnees"
r.publish(redis_client.cle_data, json_data)

# Fermer la connexion Redis
r.close()
