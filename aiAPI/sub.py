import cv2
import numpy as np
import paho.mqtt.client as mqtt
from flask import Flask, Response

# Variables pour l'adresse IP et le port du broker MQTT
broker_ip = "localhost"
broker_port = 1883

# Configurer le client MQTT
client = mqtt.Client()

# Variables pour la reconstitution de la vidéo
frame_buffer = []
frame_width = 640
frame_height = 480

# Définir la fonction de rappel lors de la réception d'un message MQTT
def on_message(client, userdata, msg):
    frame_bytes = msg.payload
    # Convertir les données de la trame en tableau numpy
    nparr = np.frombuffer(frame_bytes, np.uint8)
    # Décoder le tableau numpy en image
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # Ajouter la trame au buffer
    frame_buffer.append(frame)

# Définir la fonction pour la route de réception des messages MQTT
def receive_message():
    client.loop_start()
    client.subscribe("video_topic")  # S'abonner au topic MQTT pour la réception du flux vidéo

app = Flask(__name__)

# Fonction de génération des images de la vidéo
def generate_frames():
    while True:
        if len(frame_buffer) > 0:
            # Récupérer le prochain frame du buffer
            frame = frame_buffer.pop(0)
            # Redimensionner le frame
            frame = cv2.resize(frame, (frame_width, frame_height))
            # Convertir le frame en format d'image JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            # Envoyer le frame au client HTML pour l'affichage
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            # Attendre un court instant si le buffer est vide
            cv2.waitKey(10)

# Définir la route pour l'affichage de la vidéo
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    # Se connecter au broker MQTT
    client.connect(broker_ip, broker_port)
    client.on_message = on_message

    receive_message()  # Démarrer la réception des messages MQTT
    
    app.run(port=5200)
    
    # Se déconnecter du broker MQTT
    client.loop_stop()
    client.disconnect()
