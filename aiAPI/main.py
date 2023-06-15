from Redis.redisSubscriber import RedisSubscriber

if __name__ == '__main__':
    redis_subscriber = RedisSubscriber()
    try:
        redis_subscriber.subscribe_key_sensor()
    except Exception as e:
        print("Erreur lors de l'appel de la fonction subscribe_key dans la classe RedisClient", str(e))

    try:
        redis_subscriber.close()
    except Exception as e:
        print("Erreur lors de la fermeture de la connexion Redis :", str(e))
