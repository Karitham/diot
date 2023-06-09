---
title: iDIoT AI API v0.0.1
language_tabs:
  - python: PY
language_clients:
  - golang: GO
  - C++: CPP
---

# Topic

- Susbcribe Sensor Data : sensor 
- Susbcribe Camera Data : camera
- Publish Alert : alert  


# Data Format

## Input

*Data from sensors*

```json
{
  "id_iot": "1234",
  "temperature": "25",
  "humidity": "60",
  "iaq": "50",
  "motion": "True or False"
}
```

*Data from camera*

```json
{
  "id_iot": "1234",
  "frame": ["liste of each frame / second"]
}
```
- Frame Format : .jpg

## Output

```json
{
  "id_iot": "1234",
  "incident field": "value",
  "time" : "2023-06-18 10:20:05",
  "criticity" : "1 -> 5"
}
```

# Operating

## Subscribe Key

<aside class="warning">
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

<aside class="warning">
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
    id_iot = data.get('id')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    iaq = data.get('iaq')
    motion = data.get('motion')
except Exception as e:
    print("Erreur lors de l'extraction des valeurs à partir des données JSON :", str(e))
```

## Analyse Data

<aside class="warning">
To perform this operation, we must called the specific function that will analyse the different data and check if an incident is occurring
</aside>

## Publish Key

<aside class="warning">
In the used function, we will generate a json schema based on the analysed data if we find an incident and after that, we will publish it in the specific key
</aside>


