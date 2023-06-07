import sys
sys.path.append("./Redis")

from flask import Flask
from redisClient import RedisClient

redis_client = RedisClient()

app = Flask(__name__)

# Connexion au client Redis
redis_conn = redis_client.connection()

# Appel de la fonction process_data pour traiter les données
redis_client.process_data(redis_conn)

redis_conn.close()

if __name__ == '__main__':
    app.run(port=5200)
