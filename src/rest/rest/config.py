import os


class Config:
    MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
    MONGO_PORT = os.environ.get("MONGO_PORT", "27017")
    MONGO_DB_NAME = "test_db"
    MONGO_COLLECTION_NAME = "todos"

    @classmethod
    def get_mongo_uri(cls):
        return f"mongodb://{cls.MONGO_HOST}:{cls.MONGO_PORT}"

