import werkzeug
from flask_restful import Resource, reqparse
from models.models import User, File, Project

STORAGE_ROOT = "/home/ben/.storage"


class ProjectFilesResource(Resource):

    def get(self, user_id, project_id, file_id=None):
        project = Project.get(Project.id == project_id)
        files = File.select().where(File.project == project)

        return [{"name": file.name, "id": file.id} for file in files], 200

    def post(self, user_id, project_id, file_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()

        file = args['file']
        file.save(f"{STORAGE_ROOT}/{file.filename}")

        project = Project.get(Project.id == project_id)
        file = File(name=file.filename, path=f"{STORAGE_ROOT}/{file.filename}", project=project)
        file.save()

        return {}, 200

    def delete(self, user_id, project_id, file_id):
        file = File.get(File.id == file_id)
        file.delete_instance()

        return {}, 200