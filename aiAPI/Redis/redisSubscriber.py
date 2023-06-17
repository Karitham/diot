import redis
from Data.processData import ProcessData
import os

class RedisSubscriber:
    def __init__(self):
        self.redis_ip = os.environ.get('REDIS_ADDR')
        self.redis_port = os.environ.get('PORT')
        self.redis_user = os.environ.get('REDIS_USER')
        self.redis_password = os.environ.get('REDIS_PASS')
        self.key_sensor = "iot:sensor"
        self.key_cam = "iot:camera"
        self.redis_client = self.connection()
    
    def connection(self):
        try:
            r = redis.Redis(host=self.redis_ip, port=self.redis_port, username=self.redis_user, password= self.redis_password)
            print(f"Connection to Redis at {self.redis_ip} and port {self.redis_port} for subscription with user {self.redis_user}")
            return r
        except redis.ConnectionError as e:
            print("Erreur de connexion à Redis :", str(e))
    
    def subscribe_key_sensor(self):
        try:
            subscription = self.redis_client.pubsub()
            subscription.subscribe(self.key_sensor)
        except Exception as e:
             print("Erreur lors de la création de l'objet subscription ou de l'abonnement à la clé de données iot:sensor :", str(e))
        
        try:
            for message in subscription.listen():
                if message['type'] == 'message':
                    # Récupérer les données JSON
                    json_data = message['data']
                    #Charger le json dans la classe
                    processData = ProcessData()
                    #Appeler la fonction pour traiter les données dans le json 
                    processData.process_data_sensor(json_data)
        except Exception as e:
            print("Erreur lors de l'appel de la fonction process_data dans la classe ProcessData", str(e))
            
        
            try:
                self.redis_client.close()
            except Exception as e:
                print("Erreur lors de la fermeture de la connexion Redis :", str(e))
