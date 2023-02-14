import os
from datetime import datetime

import werkzeug
from flask_restful import Resource, reqparse
from models.models import User, File, Project


class ProjectResource(Resource):

    def get(self, user_id, project_id=None):
        user = User.get(User.id == user_id)
        projects = Project.select().where(Project.user == user)
        return [{'id': project.id, 'name': project.name, 'date_created': str(project.date_created)} for project in projects]

    def post(self, user_id, project_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()
        name = args['name']
        user = User.get(User.id == user_id)
        project = Project(name=name, date_created=datetime.now(), user=user)
        project.save()
        return {'id': project.id}

    def delete(self, user_id, project_id=None):
        project = Project.get(Project.id == project_id)
        project.delete_instance()
        return {}, 204