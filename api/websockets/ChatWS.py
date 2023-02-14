from datetime import datetime

from models.models import Conversation, ConversationMessage, ChatResponseJob
from workers.producer import publish_chat_response_task


class ChatWS:

    NAME_SPACE = "/chat"

    def __init__(self, socketio):
        self.socketio = socketio
        socketio.on_event('connect', self.connect, namespace=self.NAME_SPACE)
        socketio.on_event('disconnect', self.disconnect, namespace=self.NAME_SPACE)
        socketio.on_event('conversation', self.conversation, namespace=self.NAME_SPACE)
        socketio.on_event('message', self.message, namespace=self.NAME_SPACE)

    def connect(self):
        print('Client connected')


    def conversation(self, data):
        user_id = data['user_id']
        conversation = Conversation.select().where(Conversation.user_id == user_id).order_by(Conversation.date_created.desc()).first()
        if conversation is None:
            conversation = Conversation(user_id=user_id, date_created=datetime.now(), status="IN_PROGRESS")
            conversation.save()
        response = {
            'conversation_id': conversation.id,
            'date_created': str(conversation.date_created),
            'messages': [
                {
                    'text': message.message,
                    'date_created': str(message.date_created),
                    'read': message.read,
                    'bot': message.bot
                } for message in conversation.messages
            ]
        }
        self.socketio.emit('conversation', response, namespace=self.NAME_SPACE)


    def disconnect(self):
            print('Client disconnected')


    def message(self, data):
        print(data)
        conversation_id = data["conversation_id"]
        message = data["message"]
        reply = data["reply"]
        conversation = Conversation.get(Conversation.id == conversation_id)
        message = ConversationMessage(conversation=conversation, message=message, date_created=datetime.now())
        message.save()
        response = {
            'message': {
                'text': message.message,
                'date_created': str(message.date_created),
                'read': message.read,
                'bot': message.bot
            }
        }

        # get the most recent messages from the database

        if reply:
            chat_response_job = ChatResponseJob(conversation=conversation, date_created=datetime.now(), status="PENDING", progress=0)
            chat_response_job.save()
            publish_chat_response_task(conversation_id, prompt=message.message, job_id=chat_response_job.id)

        self.socketio.emit('message', response, namespace=self.NAME_SPACE)
