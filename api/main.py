import pika
from flask import Flask
from flask_cors import CORS
from flask_peewee.db import Database
from flask_restful import Api
from flask_socketio import SocketIO

from resources.ChatResponseJobResource import ChatResponseJobResource
from resources.ConversationResource import ConversationResource
from resources.MessageResource import MessageResource
from resources.PreprocessJobResource import PreprocessJobResource
from resources.ProjectFilesResource import ProjectFilesResource
from resources.ProjectResource import ProjectResource
from resources.ProjectTrainingDataResource import ProjectTrainingDataResource
from resources.UserResource import UserResource
from websockets.ChatWS import ChatWS

app = Flask(__name__)
api = Api(app)
app.config['SECRET_KEY'] = 'development key'
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
CORS(app)

# Configure the database
app.config['DATABASE'] = {
    'engine': 'peewee.PostgresqlDatabase',
    'name': 'database',
    'user': 'user',
    'password': 'password',
    'host': 'localhost',
    'port': 5432,
}

# Create a Peewee database object
db = Database(app)

# Connect to the database
db.connect_db()



# Add the resource to the API
api.add_resource(UserResource, '/users')
api.add_resource(ProjectResource, '/users/<string:user_id>/projects',
                 '/users/<string:user_id>/projects/<string:project_id>')
api.add_resource(ConversationResource, '/users/<string:user_id>/conversations',
                 '/users/<string:user_id>/conversations/<string:conversation_id>')
api.add_resource(MessageResource, '/users/<string:user_id>/conversations/<string:conversation_id>/messages',
                 '/users/<string:user_id>/conversations/<string:conversation_id>/messages/<string:message_id>')
api.add_resource(ProjectFilesResource, '/users/<string:user_id>/projects/<string:project_id>/files/<string:file_id>',
                 '/users/<string:user_id>/projects/<string:project_id>/files')
api.add_resource(ProjectTrainingDataResource,
                 '/users/<string:user_id>/projects/<string:project_id>/training_data/<string:training_data_id>',
                 '/users/<string:user_id>/projects/<string:project_id>/training_data')
api.add_resource(PreprocessJobResource,
                 '/users/<string:user_id>/projects/<string:project_id>/preprocessing_jobs/<string:job_id>',
                 '/users/<string:user_id>/projects/<string:project_id>/preprocessing_jobs')
api.add_resource(ChatResponseJobResource,
                 '/users/<string:user_id>/conversations/<string:conversation_id>/chat_response_jobs/<string:job_id>',
                 '/users/<string:user_id>/conversations/<string:conversation_id>/chat_response_jobs')


chat_ws = ChatWS(socketio)


if __name__ == '__main__':
    socketio.run(app, allow_unsafe_werkzeug=True, debug=True)