from Data import DataSchema
from Redis import RedisPublisher

dataSchema = DataSchema()
redisPublisher = RedisPublisher()

class IncidentDetection:
    def __init__(self, id_iot, temperature, humidity, iaq):
        self.id_iot = id_iot
        self.temperature = temperature
        self.iaq = iaq
        self.humidity = humidity
        self.alertTemperature = 55
        self.alertIaq = 300
        self.alertHumidity = 60
        
    def check_fire(self):
        if self.temperature > self.alertTemperature:
            try:
                json_data = dataSchema.fire_schema(self.id_iot, self.temperature)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction fire_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
            
    def check_flooding(self):
        if self.humidity > self.alertHumidity:
            try:
                json_data = dataSchema.flooding_schema(self.id_iot, self.humidity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
            
    def check_air_quality(self):
        if self.iaq > self.alertIaq:
            try:
                json_data = dataSchema.iaq_schema(self.id_iot, self.iaq)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
        