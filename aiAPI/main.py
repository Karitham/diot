from Redis.redisSubscriber import RedisSubscriber

if __name__ == '__main__':
    redis_subscriber = RedisSubscriber()
    try:
        redis_subscriber.subscribe_key_sensor()
    except Exception as e:
        print("Erreur lors de l'appel de la fonction subscribe_key_sensor dans la classe RedisClient", str(e))
    try:
        redis_subscriber.subscribe_key_camera()
    except Exception as e:
        print("Erreur lors de l'appel de la fonction subscribe_key_camera dans la classe RedisClient", str(e))