from AI.fireDetector import FireDetection
from AI.floodingDetector import FloodingDetection
from AI.iaqDetector import IaqDetection
from AI.humanDetector import HumanDetection

import json
from PIL import Image
import base64
from io import BytesIO

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
        except Exception as e:
            print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
            
        print(f"Received from {id_iot}: temperature: {temperature}, humidity: {humidity} and iaq: {iaq}")
            
        if id_iot is not None and temperature is not None:
            fire_detector = FireDetection(id_iot, temperature)
            try:
                fire_detector.check_fire()
            except Exception as e:
                print("Erreur lors de l'appel de la fonction check_fire dans la classe FireDetector", str(e))
                
        if id_iot is not None and humidity is not None:
            flooding_detector = FloodingDetection(id_iot, humidity)
            try:
                flooding_detector.check_flooding()
            except Exception as e:
                print("Erreur lors de l'appel de la fonction check_flooding dans la classe FloodingDetector", str(e))
            
        if id_iot is not None and iaq is not None:
            iaq_detector = IaqDetection(id_iot, iaq)
            try:
                iaq_detector.check_iaq()
            except Exception as e:
                print("Erreur lors de l'appel de la fonction check_iaq dans la classe IaqDetector", str(e))
                
    def process_data_camera(self, json_data):
        try:
            data = json.loads(json_data)
        except json.JSONDecodeError as e:
            print("Erreur lors de la conversion des données JSON :", str(e))

        try:
            id_iot = data.get('id_iot')
            #image = data.get('image')
            #bytes_decoded = base64.b64decode(image)
            #img = Image.open(BytesIO(bytes_decoded))
        except Exception as e:
            print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
            
        #print(f"Received from {id_iot}: image: {image}")
        
        if id_iot is not None:#and image is not None:
            human_detector = HumanDetection(id_iot)
            try:
                human_detector.detecter_human()
            except Exception as e:
                print("Erreur lors de l'appel de la fonction check_fire dans la classe FireDetector", str(e))
