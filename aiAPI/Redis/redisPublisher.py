import redis
import os

class RedisPublisher:
    def __init__(self):
        self.redis_ip = os.environ.get('REDIS_ADDR')
        self.redis_port = os.environ.get('PORT') 
        self.key = "alert"
        self.redis_client = self.connection()
    
    def connection(self):
        try:
            r = redis.Redis(host=self.redis_ip, port=self.redis_port)
            print(f"Connection to Redis at {self.redis_ip} and port {self.redis_port} for publishing")
            return r
        except redis.ConnectionError as e:
            print("Erreur de connexion à Redis :", str(e))
            
    def publish_alert(self, data):
        try:
            self.redis_client.publish(self.key, data)
        except Exception as e:
            print("Erreur lors de la publication : ", str(e))
        
        try:
            self.redis_client.close()
        except Exception as e:
            print("Erreur lors de la fermeture de la connexion Redis :", str(e))