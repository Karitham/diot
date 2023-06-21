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
  "id_iot": 1234,
  "temperature": 25, //en °C
  "humidity": 60, //en %
  "iaq": 50, //en KOhms
  "battery": 20, //en %
}
```

*Data from camera*

```json
{
  "id_iot": 1234,
  "image": "" //en base64
}
```

## Output

<aside>
If we have several problems at the same time, we will send one payload for each problem
</aside>

```json
{
  "id_iot": 1234,
  "type": "value", //fire or flooding or bad air quality or battery low or intrusion
  "incident field": 25, //no value for intrusion and incident field = temperature or humidity or air quality or battery
  "time" : "2023-06-18 10:20:05",
  "criticity" : "1 -> 5" //no value for intrusion or battery
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
    battery = data.get('battery')
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


