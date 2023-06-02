import cv2
import paho.mqtt.client as mqtt

# Variables pour l'adresse IP et le port du broker MQTT
broker_ip = "localhost"
broker_port = 1883

# Ouvrir la capture vidéo à partir de la webcam
cap = cv2.VideoCapture(0)

# Vérifier si la capture vidéo est ouverte correctement
if not cap.isOpened():
    print("Erreur lors de l'ouverture de la webcam")
    exit()

# Configurer le client MQTT
client = mqtt.Client()

# Se connecter au broker MQTT
client.connect(broker_ip, broker_port)

# Boucle pour capturer les images de la webcam et les publier via MQTT
while True:
    ret, frame = cap.read()
    if not ret:
        print("Erreur lors de la capture de la frame")
        break
    
    # Convertir la frame en chaîne d'octets
    frame_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
    
    # Publier la frame sur le topic MQTT
    client.publish("video_topic", payload=frame_bytes, qos=0)

    # Attendre une courte période pour simuler la fréquence d'envoi
    cv2.waitKey(10)

# Libérer les ressources
cap.release()
cv2.destroyAllWindows()
