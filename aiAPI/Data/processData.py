import sys, os, json

current_path = os.path.dirname(os.path.abspath(__file__))
parent_path = os.path.abspath(os.path.join(current_path, os.pardir))
data_path = os.path.join(parent_path, 'AI')
sys.path.append(data_path)

from incidentDetector import IncidentDetection
from humanDetector import HumanDetection

class ProcessData:
    def __init__(self):
        pass

    def process_data_sensor(self, json_data):
        try:
            data = json.loads(json_data)
        except json.JSONDecodeError as e:
            print("Erreur lors de la conversion des données JSON :", str(e))

        try:
            id_iot = data.get('id')
            temperature = data.get('temperature')
            humidity = data.get('humidity')
            iaq = data.get('iaq')
            motion = data.get('motion')
        except Exception as e:
            print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
            
        incident_detector = IncidentDetection(id_iot, temperature, humidity, iaq)
        
        try:
            incident_detector.check_fire()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_fire dans la classe IncidentDetector", str(e))
        try:
            incident_detector.check_flooding()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_flooding dans la classe IncidentDetector", str(e))
        try:
            incident_detector.check_air_quality()
        except Exception as e:
            print("Erreur lors de l'appel de la fonction check_air_quality dans la classe IncidentDetector", str(e))
            
    def process_data_camera(self, json_data):
        pass
