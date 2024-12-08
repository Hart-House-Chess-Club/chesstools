# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /python_env 

# Copy the current directory contents into the container at /app
COPY /python_env /python_env

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Define environment variable
# ENV PYTHONUNBUFFERED 1

# Command to run the app (adjust this to your app's entry point)
CMD ["python", "/python_env/scripts/process_fen.py"]
