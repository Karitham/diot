import redis

class RedisPublisher:
    def __init__(self):
        self.redis_ip = "127.0.0.1"
        self.redis_port = 6379   
        self.key = "alert"
        self.redis_client = self.connection()
    
    def connection(self):
        try:
            r = redis.Redis(host=self.redis_ip, port=self.redis_port)
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