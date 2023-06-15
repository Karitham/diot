from Data.dataSchema import DataSchema
from Redis.redisPublisher import RedisPublisher
import datetime

dataSchema = DataSchema()
redisPublisher = RedisPublisher()

class BatteryDetection:
    def __init__(self, id_iot, battery):
        self.id_iot = id_iot
        self.battery = battery
        self.alertBattery = 20
        
    def check_battery(self):
        if self.battery <= self.alertBattery:
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = dataSchema.battery_schema(self.id_iot, self.battery, formatted_timestamp)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction battery_schema dans la classe DataSchema", str(e))
            
            try:
                redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                