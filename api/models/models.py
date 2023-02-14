from peewee import *


db = PostgresqlDatabase('database', user='user', password='password', host='localhost', port=5432)


class BaseModel(Model):
    class Meta:
        database = db


class OpenAIAccount(BaseModel):
    id = PrimaryKeyField()
    api_key = CharField()


class User(BaseModel):
    id = PrimaryKeyField()
    username = CharField()
    email = CharField()
    password = CharField()
    open_ai_account = ForeignKeyField(OpenAIAccount, backref='users', null=True)


class Project(BaseModel):
    id = PrimaryKeyField()
    name = CharField()
    date_created = DateTimeField()
    user = ForeignKeyField(User, backref='models', null=True)


class File(BaseModel):
    id = PrimaryKeyField()
    name = CharField()
    path = CharField()
    project = ForeignKeyField(Project, backref='files')


class TrainingData(BaseModel):
    id = PrimaryKeyField()
    prompt = CharField()
    response = CharField()
    project = ForeignKeyField(Project, backref='training_data')


class Conversation(BaseModel):
    id = PrimaryKeyField()
    date_created = DateTimeField()
    user = ForeignKeyField(User, backref='conversations')
    user_satisfaction = IntegerField(null=True)
    conversation_success = BooleanField(null=True)
    status = CharField(null=True)


class ConversationMessage(BaseModel):
    id = PrimaryKeyField()
    message = CharField(max_length=3000)
    conversation = ForeignKeyField(Conversation, backref='messages')
    date_created = DateTimeField()
    read = BooleanField(null=True)
    bot = BooleanField(null=True)


class PreProcessingJob(BaseModel):
    id = PrimaryKeyField()
    project = ForeignKeyField(Project, backref='preprocessing_jobs')
    date_created = DateTimeField()
    date_completed = DateTimeField(null=True)
    status = CharField()
    progress = IntegerField()
    error = CharField(null=True)


class ChatResponseJob(BaseModel):
    id = PrimaryKeyField()
    conversation = ForeignKeyField(Conversation, backref='chat_response_jobs')
    date_created = DateTimeField()
    date_completed = DateTimeField(null=True)
    status = CharField()
    progress = IntegerField()
    error = CharField(null=True)
    response = ForeignKeyField(ConversationMessage, backref='chat_response_jobs', null=True)


BaseModel.create_table()
OpenAIAccount.create_table()
User.create_table()
Project.create_table()
File.create_table()
TrainingData.create_table()
PreProcessingJob.create_table()
Conversation.create_table()
ConversationMessage.create_table()
ChatResponseJob.create_table()

User.insert(username='ben', email="benripka@gmail.com", password="password").execute()
