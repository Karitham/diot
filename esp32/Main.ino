#include <Redis.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include <ArduinoJson.h>

// this sketch will build for the ESP8266 or ESP32 platform
#ifdef HAL_ESP32_HAL_H_ // ESP32
#include <WiFiClient.h>
#include <WiFi.h>
#else
#ifdef CORE_ESP8266_FEATURES_H // ESP8266
#include <ESP8266WiFi.h>
#endif
#endif

Adafruit_BME680 bme; // I2C

#define id_iot 1234

#define SDA_PIN 13  // GPIO 13 for SDA
#define SCL_PIN 14  // GPIO 14 for SCL

#define WIFI_SSID ""
#define WIFI_PASSWORD ""

#define REDIS_ADDR ""
#define REDIS_PORT 6379
#define REDIS_PASSWORD ""

#define REDIS_SENSOR "iot:sensor"

bool asSensor = false;

WiFiClient redisConn;
Redis redis(redisConn);

void setup()
{
    Serial.begin(9600);
    setupWifi();
    setupRedis();
    setupBME();
}

void loop()
{
  captureData();
}

void setupWifi(){
  Serial.println();

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to the WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
      delay(250);
      Serial.print(".");
  }
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void setupRedis(){
  if (!redisConn.connect(REDIS_ADDR, REDIS_PORT))
  {
    Serial.println("Failed to connect to the Redis server!");
    return;
  }

  auto connRet = redis.authenticate(REDIS_PASSWORD);
  if (connRet == RedisSuccess)
  {
    Serial.println("Connected to the Redis server!");
  }
  else
  {
    Serial.printf("Failed to authenticate to the Redis server! Errno: %d\n", (int)connRet);
    return;
  }
}

void setupBME(){
  while (!Serial);
  Serial.println(F("BME680 async test"));
  Wire.begin(SDA_PIN, SCL_PIN);
  if (!bme.begin()) {
    Serial.println(F("Could not find a valid BME680 sensor, check wiring!"));
    while (1);
  }

  // Set up oversampling and filter initialization
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150); // 320*C for 150 ms

  asSensor = true;
}

void captureData(){
  if(asSensor){
    if (!bme.endReading()) {
      Serial.println(F("Failed to complete reading :("));
      return;
    }

    float temperature = bme.temperature;
    float humidity = bme.humidity;
    float gasResistance = bme.gas_resistance / 1000.0;

    // Create a JSON document
    const size_t capacity = JSON_OBJECT_SIZE(4); // Adjust this value as needed
    DynamicJsonDocument jsonDoc(capacity);

    // Populate the JSON document
    jsonDoc["id_iot"] = id_iot;
    jsonDoc["temperature"] = temperature;
    jsonDoc["humidity"] = humidity;
    jsonDoc["iaq"] = gasResistance;

    // Serialize JSON to a string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Publish JSON data to Redis
    redis.publish(REDIS_SENSOR, jsonString.c_str());

    // Delay or additional logic here
    delay(1000);
  }
}
