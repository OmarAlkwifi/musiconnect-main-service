# Python 3.11 slim base for smaller image; suitable for IBM Cloud/Kubernetes.
FROM python:3.11-slim

# Create a non-root user (good practice)
RUN useradd -m appuser
WORKDIR /app

# Install system deps if needed (expand as you add features)
RUN apt-get update && apt-get install -y --no-install-recommends \        build-essential \        && rm -rf /var/lib/apt/lists/*

# Copy dependency manifest and install first (better layer caching)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Use non-root
USER appuser

# Expose default uvicorn port
EXPOSE 8000

# Start the FastAPI app with uvicorn
# In IBM Cloud Kubernetes/Openshift you can set env vars/secrets for SPOTIFY_* values.
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" ]
