from datetime import datetime

import werkzeug
from flask_restful import Resource, reqparse
from models.models import User, Project, PreProcessingJob
from workers.producer import publish_preprocessing_task


class PreprocessJobResource(Resource):

    def get(self, user_id, project_id, job_id=None):

        if job_id is not None:
            job = PreProcessingJob.get(PreProcessingJob.id == job_id)
            return {'id': job.id, 'status': job.status, 'progress': job.progress, 'error': job.error}

        project = Project.get(Project.id == project_id)

        if project is None:
            return {}, 404

        jobs = PreProcessingJob.select().where(PreProcessingJob.project == project)

        return [{'id': job.id, 'date_created': str(job.date_created), 'date_completed': str(job.date_completed), 'status': job.status, 'progress': job.progress, 'error': job.error} for job in jobs]

    def post(self, user_id, project_id, job_id=None):
        project = Project.get(Project.id == project_id)

        if project is None:
            return {}, 404

        publish_preprocessing_task(project_id)
        preprocessing_job = PreProcessingJob(project=project, date_created=datetime.now(), status="PENDING", progress=0)
        preprocessing_job.save()

        return {'job_id': preprocessing_job.id}

    def delete(self, user_id, project_id, job_id):
        pass