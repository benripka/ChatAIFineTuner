import json

import pika


def publish_to_queue(message):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', credentials=pika.PlainCredentials('rabbitmq', 'rabbitmq')))
    channel = connection.channel()
    channel.queue_declare(queue='jobs')
    channel.basic_publish(exchange='', routing_key='jobs', body=message)
    connection.close()


def publish_preprocessing_task(project_id):
    message = json.dumps({
        'project_id': project_id,
        'type': 'preprocessing',
        'timeout': 3600,
        'data': None
    })
    publish_to_queue(message)


def publish_chat_response_task(conversation_id, prompt, job_id=None):
    message = json.dumps({
        'job_id': job_id,
        'conversation_id': conversation_id,
        'type': 'chat_response',
        'timeout': 3600,
        'data': {
            'prompt': prompt
        }
    })
    publish_to_queue(message)
