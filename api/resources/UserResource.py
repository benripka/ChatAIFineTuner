from sqlite3 import IntegrityError

from flask_restful import Resource, reqparse

from models.models import User


class UserResource(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        args = parser.parse_args()
        username = args['username']
        user = User.get(User.username == username)

        if not user:
            return {"error": "User not found"}, 404
        return {'username': user.username, 'email': user.email}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()
        username = args['username']
        email = args['email']
        password = args['password']

        try:
            user = User(username=username, email=email, password=password)
            user.save()
            return {'username': user.username, 'email': user.email}, 201
        except IntegrityError:
            return {"error": "User already exists"}, 409