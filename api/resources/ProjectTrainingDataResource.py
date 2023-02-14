import werkzeug
from flask_restful import Resource, reqparse
from models.models import User, File, Project, TrainingData


class ProjectTrainingDataResource(Resource):

    def get(self, user_id, project_id, training_data_id=None):
        project = Project.get(Project.id == project_id)
        training_data = TrainingData.select().where(TrainingData.project == project)

        return [{"prompt": data.prompt, "response": data.response, "id": data.id } for data in training_data], 200


    def delete(self, user_id, project_id, training_data_id):
        training_data = TrainingData.get(TrainingData.id == training_data_id)
        training_data.delete_instance()

        return {}, 200
