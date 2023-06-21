import datetime
from AI.motherDetector import MotherDetection

class FloodingDetection(MotherDetection):
    def __init__(self, id_iot, humidity):
        super().__init__()
        self.id_iot = id_iot
        self.humidity = humidity
        self.alertHumidity1 = 60
        self.alertHumidity2 = 70
        self.alertHumidity3 = 80
        self.alertHumidity4 = 90
        self.alertHumidity5 = 95
        
    def check_flooding(self):
        if self.humidity > self.alertHumidity5:
            criticity = 5
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity4:
            criticity = 4
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity3:
            criticity = 3
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity2:
            criticity = 2
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.humidity > self.alertHumidity1:
            criticity = 1
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.flooding_schema(self.id_iot, self.humidity, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction flooding_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
        