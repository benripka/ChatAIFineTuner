import pika
import time

# Connect to RabbitMQ server using username and password
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', credentials=pika.PlainCredentials('rabbitmq', 'rabbitmq')))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='jobs')

# Send a message to the queue every 10 seconds
while True:
    message = 'New job'
    channel.basic_publish(exchange='', routing_key='jobs', body=message)
    print(f'Sent message: {message}')
    time.sleep(10)

connection.close()
