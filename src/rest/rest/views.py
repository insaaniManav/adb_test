from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .database import Database

db = Database()

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = db.fetch_todos()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            logging.error(f"Error fetching TODOs: {e}", exc_info=True)
            return Response({"error": "An error occurred while fetching TODOs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            todo_item = request.data
            db.add_todo(todo_item)
            return Response({"message": "TODO item added successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(f"Error adding TODO: {e}", exc_info=True)
            return Response({"error": "An error occurred while adding the TODO item."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
