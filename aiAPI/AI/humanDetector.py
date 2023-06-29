import cv2
import numpy as np
import datetime
from AI.motherDetector import MotherDetection

class HumanDetection:
    def __init__(self, id_iot):
        self.id_iot = id_iot

    def detecter_human(self):
        # Vérifier si l'image n'est pas vide
        if self.image is None:
            return

        timestamp = datetime.datetime.now()
        formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
        try:
            json_data = MotherDetection.dataSchema.human_schema(self.id_iot, formatted_timestamp)
        except Exception as e:
            print("Erreur lors de l'appel de la fonction human_schema dans la classe DataSchema", str(e))
        
        try:
            MotherDetection.redisPublisher.publish_alert(json_data)
        except Exception as e:
            print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))


"""
# Charger le modèle de détection de corps entiers (HOG + SVM)
body_cascade = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")

class HumanDetection:
    def __init__(self, id_iot, image):
        self.id_iot = id_iot
        self.image = image
        self.humain_present = False
        self.humain_disparu = False

    def detecter_human(self):
        # Vérifier si l'image n'est pas vide
        if self.image is None:
            return
        # Convertir l'image en niveaux de gris
        gray = cv2.cvtColor(np.array(self.image), cv2.COLOR_RGB2GRAY)
        # Détecter les corps dans l'image
        bodies = body_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        # Vérification si un corps est détecté et que le message n'a pas encore été imprimé
        if len(bodies) > 0 and not self.humain_present:
            timestamp = datetime.datetime.now()
            formatted_timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            try:
                json_data = MotherDetection.dataSchema.human_schema(self.id_iot, formatted_timestamp)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction human_schema dans la classe DataSchema", str(e))
            
            try:
                MotherDetection.redisPublisher.publish_alert(json_data)
            except Exception as e:
                print("Erreur lors de l'appel de la fonction publish_alert dans la classe RedisPublisher", str(e))
                
            self.humain_present = True
            self.humain_disparu = False
        # Vérification si aucun corps n'est détecté et que le message a déjà été imprimé
        elif len(bodies) == 0 and not self.humain_disparu:
            self.humain_present = False
            self.humain_disparu = True"""