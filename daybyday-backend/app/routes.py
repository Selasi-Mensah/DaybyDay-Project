from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Task, User

main = Blueprint('main', __name__)

@main.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

@main.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    user_id = get_jwt_identity()
    task = Task(
        title=data['title'],
        description=data.get('description'),
        due_date=data['due_date'],
        priority=data['priority'],
        user_id=user_id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@main.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    task = Task.query.get_or_404(task_id)
    if task.user_id != get_jwt_identity():
        return jsonify({"msg": "Unauthorized"}), 403
    task.title = data['title']
    task.description = data.get('description')
    task.due_date = data['due_date']
    task.priority = data['priority']
    task.completed = data['completed']
    db.session.commit()
    return jsonify(task.to_dict())

@main.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != get_jwt_identity():
        return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(task)
    db.session.commit()
    return jsonify({"msg": "Task deleted"})
