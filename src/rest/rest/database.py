from pymongo import MongoClient
from .config import Config


class Database:
    def __init__(self):
        self.client = MongoClient(Config.get_mongo_uri())
        self.db = self.client[Config.MONGO_DB_NAME]
        self.collection = self.db[Config.MONGO_COLLECTION_NAME]

    def fetch_todos(self):
        return list(self.collection.find({}, {"_id": 0}))

    def add_todo(self, todo_item):
        self.collection.insert_one(todo_item)

