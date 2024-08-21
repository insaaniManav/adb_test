from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db['todos']
class TodoListView(APIView):

    def get(self, request):
        try:
            # Retrieve all TODO items from the MongoDB collection
            todos = list(collection.find({}, {"_id": 0}))  # Exclude the MongoDB ID from the result
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            logging.error(f"Error fetching TODOs: {e}")
            return Response({"error": "An error occurred while fetching TODOs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            # Insert the new TODO item into the MongoDB collection
            todo_item = request.data
            print(request.data)
            print(todo_item)
            collection.insert_one(todo_item)
            return Response({"message": "TODO item added successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(f"Error adding TODO: {e}")
            return Response({"error": "An error occurred while adding the TODO item."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
