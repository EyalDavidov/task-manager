from flask import Flask
from config import Config
from extensions import db, jwt
from auth import auth_bp
from routes import tasks_bp
from flask_cors import CORS

# Factory function to create and configure the Flask app
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

    # Initialize the extensions
    db.init_app(app) 
    jwt.init_app(app)

    # Register blueprints for authentication and task routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)

    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()

    return app

# Create the Flask app instance
app = create_app()

# Define a simple route to check if the server is running
@app.route("/")
def home():
    return {"message": "Server is running"}

# Run the app in debug mode if executed directly
if __name__ == "__main__":
    app.run(debug=True)
