from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token
import re

# Create a Blueprint for authentication routes
auth_bp = Blueprint("auth", __name__)

# Helper function to validate email format
def is_valid_email(email):
    return re.match(r"[^@\s]+@[^@\s]+\.[^@\s]+", email)

# Helper function to validate password length
def is_valid_password(password):
    return len(password) >= 6

# Route for user signup
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    # Validate email
    if not email or not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Validate username
    if not username or username.strip() == "":
        return jsonify({"error": "Username is required"}), 400

    # Validate password
    if not password or not is_valid_password(password):
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    # Check if email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create a new user and save to the database
    new_user = User(email=email, username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Route for user login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Validate email and password presence
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Validate email format
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Check if user exists and password is correct
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT access token
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200
