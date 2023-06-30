#include "esp_camera.h"
#include "Arduino.h"
#include "soc/soc.h"           // Disable brownour problems
#include "soc/rtc_cntl_reg.h"  // Disable brownour problems
#include "driver/rtc_io.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <ArduinoHttpClient.h>

#include "base64.h"

#include <Redis.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include <ArduinoJson.h>

#define SDA_PIN 13  // GPIO 13 for SDA
#define SCL_PIN 14  // GPIO 14 for SCL

#define REDIS_ADDR "rd.idiot.0xf.fr"
#define REDIS_PORT 6379
#define REDIS_USER "default"
#define REDIS_PASSWORD "bHhSwb&g#8W28NQr#M2@4ApxHiY&5m$7XzNAN&7Jo5HnSHfizNiw&NAR8HpKtwY"

#define REDIS_SENSOR "iot:sensor"
#define REDIS_CAMERA "iot:camera"

Adafruit_BME680 bme; // I2C

const char* id_iot = "12345";

const char* ssid = "OPPO A74";
const char* password = "u7v9sauk";

const char* serverHost = "cdn.idiot.0xf.fr";
const int serverPort = 80;
const char* endpoint = "/video/12345";

bool asSensor = false;

// Déclaration des broches et des variables pour le capteur PIR
int inputPin = 12;               // Choisissez la broche d'entrée (pour le capteur PIR)
int pirState = LOW;             // Nous commençons en supposant qu'aucun mouvement n'a été détecté
int val = 0;                    // Variable pour lire l'état de la broche

int calibrationTime = 10;

WiFiClient wifi;
WiFiClient redisConn;
Redis redis(redisConn);
HttpClient client = HttpClient(wifi, serverHost, serverPort);

// Pin definition for CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

void setup(){
  Serial.begin(9600);
  InitWifi();
  InitCamera();
  setupRedis();
  calibratePIR();
  setupBME();
}

void loop(){
  streamVideo();
  captureData();
  checkMotion();
}

void calibratePIR(){
  Serial.print("calibrating sensor ");
  for(int i = 0; i < calibrationTime; i++){
    Serial.print(".");
    delay(1000);
  }
  Serial.println();
  Serial.println("PIR calibrated");
}

void InitWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void InitCamera() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG; 
  
  if(psramFound()){
    config.frame_size = FRAMESIZE_QVGA; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
    config.jpeg_quality = 5;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 5;
    config.fb_count = 1;
  }
  
  // Init Camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  camera_sensor_t * s = esp_camera_sensor_get();
  s->set_framesize(s, FRAMESIZE_VGA);
  Serial.println("Camera init OK");
  return;
}

void setupRedis(){
  if (!redisConn.connect(REDIS_ADDR, REDIS_PORT))
  {
    Serial.println("Failed to connect to the Redis server!");
    return;
  }

  auto connRet = redis.authenticate(REDIS_USER, REDIS_PASSWORD);
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
    return;
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
  }
}

void streamVideo() {
  camera_fb_t * fb = NULL;

  // Take Picture with Camera
  fb = esp_camera_fb_get();  
  if(!fb) {
    Serial.println("Camera capture failed");
    return;
  }

  client.beginRequest();
  client.post("/image/12345");
  client.sendHeader("Content-Type", "image/jpeg");
  client.sendHeader("Content-Length", fb->len);
  client.beginBody();
  client.write(fb->buf, fb->len);
  client.endRequest();

  esp_camera_fb_return(fb);
}

void checkMotion(){
  val = digitalRead(inputPin);
  
  if (val == HIGH) { // Vérifie si la valeur est HIGH
    if (pirState == LOW) {
      // Nous venons de détecter un mouvement
      Serial.println("Mouvement détecté !");
      pirState = HIGH;
      pinMode(4, OUTPUT);
      digitalWrite(4, HIGH);
      //capturePhoto();
    }
  } else {
    if (pirState == HIGH) {
      // Le mouvement s'est terminé
      Serial.println("Mouvement terminé !");
      pirState = LOW;
      pinMode(4, OUTPUT);
      digitalWrite(4, LOW);
    }
  }

  delay(100);
}

void capturePhoto(){
  camera_fb_t * fb = NULL;
  fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Failed to capture image");
    return;
  }

  // Convert the captured image to base64
  String encodedImage;
  if (fb->len > 0) {
    uint8_t* imgData = fb->buf;
    size_t imgSize = fb->len;

    // Encode the image data in base64
    encodedImage = base64::encode(imgData, imgSize);
  }

  esp_camera_fb_return(fb);

  const size_t capacity = JSON_OBJECT_SIZE(2); // Adjust this value as needed
  DynamicJsonDocument jsonDoc(capacity);

  // Populate the JSON document
  jsonDoc["id_iot"] = id_iot;
  jsonDoc["image"] = encodedImage;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  Serial.println(jsonString);

  redis.publish(REDIS_CAMERA, jsonString.c_str());
}