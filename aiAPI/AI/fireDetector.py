from Data.dataSchema import DataSchema
from Redis.redisPublisher import RedisPublisher
import datetime

dataSchema = DataSchema()
redisPublisher = RedisPublisher()

class FireDetection:
    def __init__(self, id_iot, temperature):
        self.id_iot = id_iot
        self.temperature = temperature
        self.alertTemperature1 = 30
        self.alertTemperature2 = 45
        self.alertTemperature3 = 60
        self.alertTemperature4 = 70
        self.alertTemperature5 = 80
        
    def check_fire(self):
        if self.temperature > self.alertTemperature5:
            criticity = 5
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.temperature > self.alertTemperature4:
            criticity = 4
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.temperature > self.alertTemperature3:
            criticity = 3
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.temperature > self.alertTemperature2:
            criticity = 2
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.temperature > self.alertTemperature1:
            criticity = 1
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
        