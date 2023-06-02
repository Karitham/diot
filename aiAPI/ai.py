import cv2
from cvzone.PoseModule import PoseDetector


url = "http://localhost:5200/video_feed"
# Création d'un objet PoseDetector
detector = PoseDetector()

# Variable pour garder une trace de l'état de la détection
humain_present = False
humain_disparu = False

# Capture vidéo à partir de l'URL
cap = cv2.VideoCapture(url)

while True:
    # Lecture de la vidéo frame par frame
    success, img = cap.read()

    # Vérifier si la lecture de la vidéo a réussi et l'image n'est pas vide
    if not success or img is None:
        # Si la lecture échoue, recommencer la lecture de la vidéo
        cap = cv2.VideoCapture(url)
        continue

    # Recherche des poses dans l'image
    img = detector.findPose(img)

    # Recherche des positions des points clés et du cadre englobant
    lmlist, bbox = detector.findPosition(img)

    # Vérification si un humain est détecté et que le message n'a pas encore été imprimé
    if lmlist and not humain_present:
        print("Humain présent")
        humain_present = True
        humain_disparu = False
    # Vérification si aucun humain n'est détecté et que le message a déjà été imprimé
    elif not lmlist and not humain_disparu:
        print("Humain disparu")
        humain_present = False
        humain_disparu = True

