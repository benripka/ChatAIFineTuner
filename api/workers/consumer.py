import json
import os
from datetime import datetime

import magic

import pika

from models.models import Project, TrainingData, ChatResponseJob, ConversationMessage
from workers.openai_client import get_training_data_response, get_chat_response

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', credentials=pika.PlainCredentials('rabbitmq', 'rabbitmq')))
channel = connection.channel()
channel.queue_declare(queue='jobs')


def file_to_text(file_path):
    if not os.path.exists(file_path):
        raise ValueError(f'Error: File "{file_path}" does not exist')

    # Check if the file is a text file
    file_type = magic.from_file(file_path)
    if 'text' not in file_type:
        raise ValueError(f'Error: "{file_path}" is not a text file')

    # Read the file into memory
    with open(file_path, 'r') as f:
        return f.read()


def save_training_data(project_id, training_data):
    project = Project.get(Project.id == project_id)
    for pair in training_data:
        training_data_entry = TrainingData(prompt=pair['prompt'], response=pair['response'], project=project)
        training_data_entry.save()


def parse_openai_response(response):
    response = response["choices"][0]["text"]
    pairs = response.split('\nQuestion ')
    training_data = [{"prompt": pair.split('Answer: ')[0], "response": pair.split('Answer: ')[1]} for pair in pairs if "Answer" in pair]
    return training_data


def process_job(chanel, method, properties, body):
    print(f'Received message: {body}')
    job = json.loads(body)
    if job['type'] == 'preprocessing':
        print(f'Preprocessing job for project {job["project_id"]}')
        project = Project.get(Project.id == job['project_id'])
        files = project.files

        for file in files:
            print(f'Preprocessing file {file.name}')
            try:
                file_text = file_to_text(file.path)
                training_data_response = get_training_data_response(file_text)
                training_data = parse_openai_response(training_data_response)
                save_training_data(project.id, training_data)
            except Exception as e:
                print(f'Error Processing: {e}')
        print('Done preprocessing')

    if job['type'] == 'chat_response':
        chat_response_job = ChatResponseJob.get(ChatResponseJob.id == job['job_id'])
        try:
            print(f'Chat response job for conversation {job["conversation_id"]}')
            prompt = job['data']['prompt']
            print(f'Prompt: {prompt}')
            response = get_chat_response(prompt)
            print(f'Response: {response}')

            message = ConversationMessage(message=response, conversation=chat_response_job.conversation, date_created=datetime.now(), read=False, bot=True)
            message.save()

            chat_response_job.response = message
            chat_response_job.status = 'COMPLETE'
            chat_response_job.save()
        except:
            chat_response_job.status = 'FAILED'
            chat_response_job.save()


channel.basic_consume(queue='jobs', on_message_callback=process_job, auto_ack=True)
channel.start_consuming()
