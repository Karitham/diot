---
title: iDIoT AI API v0.0.1
language_tabs:
  - python: PY
language_clients:
  - golang: GO
  - C++: CPP
---

# Topic

- Susbcribe Sensor Data : "iot:sensor" 
- Susbcribe Camera Data : "iot:camera"
- Publish Alert : "iot:alert"  


# Data Format

## Input

*Data from sensors*

```json
{
  "id_iot": "1234", //String
  "temperature": 25, //en °C //float
  "humidity": 60, //en % //float
  "iaq": 50, //en KOhms //float
}
```

*Data from camera*

```json
{
  "id_iot": "1234", //String
  "image": "" //en base64
}
```

## Output

<aside>
If we have several problems at the same time, we will send one payload for each problem
</aside>

```json
{
  "id_iot": "1234", //String
  "type": "value", //fire or flooding or bad air quality or intrusion //String
  "incident field": 25, //no value for intrusion and incident field = temperature or humidity or air quality //float
  "timestamp" : "2023-06-18 10:20:05", //Time
  "criticity" : "1 -> 5" //no value for intrusion //int
}
```

# Operating

## Subscribe Key

<aside>
Before to begin data analisys, we need to subscribe to the specific key to recuperate the data from the different sensors.
</aside>

<a id="apiSubKey"></a>

> Code samples
```python
redis_subscriber = RedisSubscriber()

try:
    redis_subscriber.subscribe_key_sensor()
except Exception as e:
    print("Erreur lors de l'appel de la fonction subscribe_key dans la classe RedisClient", str(e))
```

## Process Data

<aside>
In this step, we will create a variable for each json value depending on the field in order to analyse each data of this one.
</aside>

<a id="apiProcessData"></a>

> Code samples

```python
try:
    data = json.loads(json_data)
except json.JSONDecodeError as e:
    print("Erreur lors de la conversion des données JSON :", str(e))
try:
    id_iot = data.get('id_iot')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    iaq = data.get('iaq')
except Exception as e:
    print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
```

## Analyse Data

<aside>
To perform this operation, we must called the specific function that will analyse the different data and check if an incident is occurring
</aside>

## Publish Key

<aside>
In the used function, we will generate a json schema based on the analysed data if we find an incident and after that, we will publish it in the specific key
</aside>

# Criticity Sensors

## Fire
<aside>
- Criticity 1 : 40 °C
- Criticity 2 : 50 °C
- Criticity 3 : 60 °C
- Criticity 4 : 70 °C
- Criticity 5 : 80 °C
</aside>

## Flooding
<aside>
- Criticity 1 : 60 %
- Criticity 2 : 70 %
- Criticity 3 : 80 %
- Criticity 4 : 90 %
- Criticity 5 : 95 %
</aside>

## Air Quality
<aside>
- Criticity 1 : 150 KOhms
- Criticity 2 : 250 KOhms
- Criticity 3 : 350 KOhms
- Criticity 4 : 400 KOhms
- Criticity 5 : 450 KOhms
</aside>


