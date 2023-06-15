from Data.dataSchema import DataSchema
from Redis.redisPublisher import RedisPublisher
import datetime

dataSchema = DataSchema()
redisPublisher = RedisPublisher()

class FloodingDetection:
    def __init__(self, id_iot, humidity):
        self.id_iot = id_iot
        self.humidity = humidity
        self.alertHumidity1 = 50
        self.alertHumidity2 = 60
        self.alertHumidity3 = 70
        self.alertHumidity4 = 80
        self.alertHumidity5 = 90
        
    def check_flooding(self):
        if self.humidity > self.alertHumidity5:
            criticity = 5
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity4:
            criticity = 4
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity3:
            criticity = 3
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity2:
            criticity = 2
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity1:
            criticity = 1
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
        