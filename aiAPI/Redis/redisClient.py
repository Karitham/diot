import redis
import json

class RedisClient:
    def __init__(self):
        self.redis_ip = "127.0.0.1"
        self.redis_port = 6379   
        self.cle_alert = "alert"
        self.cle_data = "data"
    
    def connection(self):
        try:
            r = redis.Redis(host=self.redis_ip, port=self.redis_port)
            return r
        except redis.exceptions.RedisError as e:
            print("Erreur de connexion à Redis :", e)
    
    def process_data(self, redis_client):
        subscription = redis_client.pubsub()
        subscription.subscribe(self.cle_data)
        
        for message in subscription.listen():
            if message['type'] == 'message':
                # Récupérer les données JSON
                json_data = message['data']

                # Convertir les données JSON en objet Python
                data = json.loads(json_data)

                id_iot = data.get('id')
                temperature = data.get('temperature')
                humidity = data.get('humidity')
                co2 = data.get('co2')
                motion = data.get('motion')

                if id_iot is not None and temperature is not None and co2 is not None:
                    print(f"{id_iot} envoie une temperature de {temperature} et un taux de co2 de {co2}")

                if id_iot is not None and humidity is not None:
                    print(f"{id_iot} envoie un taux d'humidité de {humidity}")

                if id_iot is not None and motion is not None:
                    print(f"{id_iot} envoie une détection de mouvement de {motion}")
                    
    def send_alert(self, redis_client, data):
        json_data = json.dumps(data)
        redis_client.rpush(self.cle_data, json_data)
        redis_client.close()
