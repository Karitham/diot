import datetime
from AI.motherDetector import MotherDetection

class IaqDetection(MotherDetection):
    def __init__(self, id_iot, iaq):
        super().__init__()
        self.id_iot = id_iot
        self.iaq = iaq
        self.alertIaq1 = 75
        self.alertIaq2 = 150
        self.alertIaq3 = 250
        self.alertIaq4 = 350
        self.alertIaq5 = 450
        
    def check_iaq(self):
        if self.iaq > self.alertIaq5:
            criticity = 5
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.iaq_schema(self.id_iot, self.iaq, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.iaq > self.alertIaq4:
            criticity = 4
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.iaq_schema(self.id_iot, self.iaq, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.iaq > self.alertIaq3:
            criticity = 3
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.iaq_schema(self.id_iot, self.iaq, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.iaq > self.alertIaq2:
            criticity = 2
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.iaq_schema(self.id_iot, self.iaq, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
        elif self.iaq > self.alertIaq1:
            criticity = 1
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.iaq_schema(self.id_iot, self.iaq, formatted_timestamp, criticity)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction iaq_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
        