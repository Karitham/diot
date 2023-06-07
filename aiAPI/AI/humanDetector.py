from cvzone.PoseModule import PoseDetector

class HumanDetection:
    def __init__(self, frames):
        self.frames = frames
        self.detector = PoseDetector()
        self.humain_present = False
        self.humain_disparu = False

    def detecter_human(self):
        for img in self.frames:
            # Vérifier si l'image n'est pas vide
            if img is None:
                continue

            # Recherche des poses dans l'image
            img = self.detector.findPose(img)

            # Recherche des positions des points clés et du cadre englobant
            lmlist = self.detector.findPosition(img)

            # Vérification si un humain est détecté et que le message n'a pas encore été imprimé
            if lmlist and not self.humain_present:
                print("Humain présent")
                self.humain_present = True
                self.humain_disparu = False
            # Vérification si aucun humain n'est détecté et que le message a déjà été imprimé
            elif not lmlist and not self.humain_disparu:
                print("Humain disparu")
                self.humain_present = False
                self.humain_disparu = True
