from datetime import datetime

from flask_restful import Resource, reqparse
from models.models import Project, PreProcessingJob, Conversation, ChatResponseJob, ConversationMessage
from workers.producer import publish_preprocessing_task, publish_chat_response_task


class ChatResponseJobResource(Resource):

    def get(self, user_id, conversation_id):
        response_job = ChatResponseJob.select().where(ChatResponseJob.conversation == conversation_id).order_by(ChatResponseJob.date_created.desc()).limit(1)[0]
        message = response_job.response
        if message is None:
            return {
                'job_id': response_job.id,
                'status': response_job.status,
                'progress': response_job.progress
            }, 200
        else:
            response = {
                'response': {
                    'text': message.message,
                    'date_created': str(message.date_created),
                    'read': message.read,
                    'bot': message.bot
                },
                'job_id': response_job.id,
                'status': response_job.status,
            }
            return response, 200

    def post(self, user_id, conversation_id, job_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str, required=True)
        args = parser.parse_args()
        message = args['message']
        conversation = Conversation.get(Conversation.id == conversation_id)

        if conversation is None:
            return {}, 404

        publish_chat_response_task(conversation_id, prompt=message)
        chat_response_job = ChatResponseJob(conversation=conversation, date_created=datetime.now(), status="PENDING", progress=0)
        chat_response_job.save()

        return {'job_id': chat_response_job.id}, 200

    def delete(self, user_id, project_id, job_id):
        pass