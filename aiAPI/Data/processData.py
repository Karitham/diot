import json
from AI.fireDetector import FireDetection
from AI.floodingDetector import FloodingDetection
from AI.iaqDetector import IaqDetection
from AI.batteryDetector import BatteryDetection
from AI.humanDetector import HumanDetection

class ProcessData:
    def __init__(self):
        pass

    def process_data_sensor(self, json_data):
        try:
            data = json.loads(json_data)
        except json.JSONDecodeError as e:
            print("Erreur lors de la conversion des données JSON :", str(e))

        try:
            id_iot = data.get('id_iot')
            temperature = data.get('temperature')
            humidity = data.get('humidity')
            iaq = data.get('iaq')
            battery = data.get('battery')
        except Exception as e:
            print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
            
        print(f"Received from {id_iot}: temperature: {temperature}, humidity: {humidity} and iaq: {iaq}")
            
        fire_detector = FireDetection(id_iot, temperature)
        flooding_detector = FloodingDetection(id_iot, humidity)
        iaq_detector = IaqDetection(id_iot, iaq)
        battery_detector = BatteryDetection(id_iot, battery)
        
        try:
            fire_detector.check_fire()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_fire dans la classe FireDetector", str(e))
        
        try:
            flooding_detector.check_flooding()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_flooding dans la classe FloodingDetector", str(e))
            
        try:
            iaq_detector.check_iaq()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_iaq dans la classe IaqDetector", str(e))
        
        try:
            battery_detector.check_battery()
        except Exception as e:
            print("Erreur élors de l'appel de la fonction check_battery dans la classe BatteryDetector", str(e))
              
    def process_data_camera(self, json_data):
        pass
