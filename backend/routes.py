from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Task, Subtask
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():
    data = request.get_json()
    user_id = get_jwt_identity()

    due_date_str = data.get("due_date")
    due_date = datetime.strptime(due_date_str, "%Y-%m-%d") if due_date_str else None

    new_task = Task(
        title=data["title"],
        description=data.get("description"),
        status=data["status"],
        due_date=due_date,
        user_id=user_id
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"}), 201



@tasks_bp.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    
    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "due_date": task.due_date.strftime("%Y-%m-%d") if task.due_date else None
        } for task in tasks
    ]), 200


@tasks_bp.route("/tasks/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({"message": "Task not found"}), 404

    if "title" in data:
        task.title = data["title"]
    if "description" in data:
        task.description = data["description"]
    if "status" in data:
        task.status = data["status"]
    if "due_date" in data:
        if data["due_date"]:
            task.due_date = datetime.strptime(data["due_date"], "%Y-%m-%d")
        else:
            task.due_date = None

    db.session.commit()
    
    return jsonify({"message": "Task updated successfully"}), 200


@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message": "Task deleted successfully"}), 200


@tasks_bp.route("/tasks/<int:task_id>/subtasks", methods=["POST"])
@jwt_required()
def create_subtask(task_id):
    data = request.get_json()
    user_id = get_jwt_identity()

    # בדיקה שהמשימה שייכת למשתמש
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({"message": "Task not found"}), 404

    due_date_str = data.get("due_date")
    due_date = datetime.strptime(due_date_str, "%Y-%m-%d") if due_date_str else None

    subtask = Subtask(
        title=data["title"],
        status=data.get("status", "pending"),
        due_date=due_date,
        task_id=task_id
    )

    db.session.add(subtask)
    db.session.commit()

    return jsonify({"message": "Subtask created successfully"}), 201


@tasks_bp.route("/tasks/<int:task_id>/subtasks", methods=["GET"])
@jwt_required()
def get_subtasks(task_id):
    user_id = get_jwt_identity()

    # בדיקה שהמשימה שייכת למשתמש
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({"message": "Task not found"}), 404

    subtasks = Subtask.query.filter_by(task_id=task_id).all()

    return jsonify([
        {
            "id": sub.id,
            "title": sub.title,
            "status": sub.status,
            "due_date": sub.due_date.strftime("%Y-%m-%d") if sub.due_date else None
        } for sub in subtasks
    ]), 200