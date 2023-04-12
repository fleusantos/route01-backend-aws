FROM python:3.10.6

COPY requirements.txt .
RUN pip install -r requirements.txt

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY . /app

WORKDIR /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
# CMD ["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"]

