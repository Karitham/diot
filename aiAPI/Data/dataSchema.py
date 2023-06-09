import json

class DataSchema:
    def __init__(self):
        pass
    
    def fire_schema(self, id_iot, temperature):
        data = {
                    'id': id_iot,
                    'temperature': temperature,
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def flooding_schema(self, id_iot, humidity):
        data = {
                    'id': id_iot,
                    'humidity': humidity,
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def iaq_schema(self, id_iot, iaq):
        data = {
                    'id': id_iot,
                    'air quality': iaq,
                }
        
        json_data = self.convert_to_json(data)
        
        return json_data
    
    def convert_to_json(self, data):
        return json.dumps(data)