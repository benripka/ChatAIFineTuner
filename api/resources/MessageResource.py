from datetime import datetime

from flask_restful import Resource, reqparse

from models.models import ConversationMessage, Conversation


class MessageResource(Resource):

    def post(self, user_id, conversation_id, message_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str, required=True)
        args = parser.parse_args()
        message = args['message']

        conversation = Conversation.get(Conversation.id == conversation_id)
        message = ConversationMessage(conversation=conversation, message=message, date_created=datetime.now())
        message.save()

        return {'id': message.id, 'text': message.message, 'read': False, 'date_created': str(message.date_created)}, 200