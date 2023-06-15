from Data.dataSchema import DataSchema
from Redis.redisPublisher import RedisPublisher

class MotherDetection:
    dataSchema = DataSchema()
    redisPublisher = RedisPublisher()
    
    def __init__(self):
        pass