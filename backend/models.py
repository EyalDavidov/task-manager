from extensions import db
from flask_bcrypt import generate_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True) 
    status = db.Column(db.String(50), nullable=False, default="pending")
    due_date = db.Column(db.DateTime, nullable=True) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    subtasks = db.relationship("Subtask", backref="task", cascade="all, delete-orphan")

class Subtask(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="pending") 
    due_date = db.Column(db.DateTime, nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey("task.id", ondelete="CASCADE"), nullable=False)
