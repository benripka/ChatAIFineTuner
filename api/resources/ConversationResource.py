from datetime import datetime
from flask_restful import Resource, reqparse

from models.models import Conversation, User, ConversationMessage, ChatResponseJob


# A resource class for Conversation
class ConversationResource(Resource):

    def get(self, user_id, conversation_id=None):
        # Get conversation by id first or the most recent with IN_PROGRESS status, or 404

        conversation = None
        if conversation_id is not None:
            conversation = Conversation.get(Conversation.id == conversation_id)
        else:
            conversation = Conversation.select().where(Conversation.user == user_id and Conversation.status == "IN_PROGRESS").order_by(Conversation.date_created.desc()).limit(1)

        if len(conversation) is not 1:
            return [], 404
        else:
            conversation = conversation[0]
            messages = ConversationMessage.select().where(ConversationMessage.conversation == conversation)
            return {
                    'id': conversation.id,
                    'date_created': str(conversation.date_created),
                    'messages': [
                        {
                            'text': message.message,
                            'date_created': str(message.date_created),
                            'read': message.read,
                            'bot': message.bot
                        } for message in messages
                    ]
                }

    def post(self, user_id, conversation_id=None):
        user = User.get(User.id == user_id)
        conversation = Conversation(date_created=datetime.now(), user=user, status="IN_PROGRESS")
        conversation.save()
        return {'id': conversation.id}, 200
