FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set environment variables
ENV PORT=8080
ENV HOST=0.0.0.0

# Run the application with Gunicorn
CMD exec gunicorn --bind $HOST:$PORT app:app 