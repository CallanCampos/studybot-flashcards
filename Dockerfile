FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Keep the model cache inside the image instead of /root
ENV TRANSFORMERS_CACHE=/app/cache
RUN mkdir -p /app/cache

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]