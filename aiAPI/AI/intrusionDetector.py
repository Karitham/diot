import sys
sys.path.append("../Redis")

class IntrusionDetection:
    def __init__(self):
        self.motion = True
        
    def check_motion(self, motion):
        if motion == self.motion:
            print("humain détecté")