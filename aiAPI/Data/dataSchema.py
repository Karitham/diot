import json

class DataSchema:
    def __init__(self):
        pass
    
    def fire_schema(self, id_iot, temperature, timestamp, criticity):
        data = {
                    'id': id_iot,
                    'type': "fire",
                    'temperature': temperature,
                    'timestamp': timestamp,
                    'criticity': criticity
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def flooding_schema(self, id_iot, humidity, timestamp, criticity):
        data = {
                    'id': id_iot,
                    'type': "flooding",
                    'humidity': humidity,
                    'timestamp': timestamp,
                    'criticity': criticity
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def iaq_schema(self, id_iot, iaq, timestamp, criticity):
        data = {
                    'id': id_iot,
                    'type': "bad air quality",
                    'air quality': iaq,
                    'timestamp': timestamp,
                    'criticity': criticity
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def battery_schema(self, id_iot, battery, timestamp):
        data = {
                    'id': id_iot,
                    'type': "low battery",
                    'battery': battery,
                    'timestamp': timestamp
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def human_schema(self, id_iot, human_presence, timestamp):
        data = {
                    'id': id_iot,
                    'type': "intrusion",
                    'timestamp': timestamp
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def convert_to_json(self, data):
        return json.dumps(data)