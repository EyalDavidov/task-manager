from flask import Flask
from config import Config
from extensions import db, jwt
from auth import auth_bp
from routes import tasks_bp
from models import User
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app) 

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp) 

    with app.app_context():
        db.create_all()

    return app

app = create_app()

@app.route("/")
def home():
    return {"message": "Server is running"}

if __name__ == "__main__":
    app.run(debug=True)
