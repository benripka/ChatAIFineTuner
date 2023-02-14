import pika

# Connect to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', credentials=pika.PlainCredentials('rabbitmq', 'rabbitmq')))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='jobs')


# Define a callback function to process messages
def callback(ch, method, properties, body):
    print(f'Received message: {body}')


# Consume messages from the queue
channel.basic_consume(queue='jobs', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. Press Ctrl+C to exit.')
channel.start_consuming()