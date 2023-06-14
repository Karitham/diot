FROM python:3.18-alpine
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
CMD [ "python", "main.py" ]
