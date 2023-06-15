FROM python:3.11-slim-buster
WORKDIR /app

RUN apt-get update && apt-get install python3-opencv -y

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
CMD [ "python", "main.py" ]
