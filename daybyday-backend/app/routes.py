from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, User, Task

# Create a Blueprint for routes
bp = Blueprint('routes', __name__)

# Route to handle task creation
@bp.route('/tasks', methods=['POST'])
@jwt_required()  # Require JWT for access
def create_task():
    current_user_id = get_jwt_identity()  # Get the user ID from the JWT token
    data = request.get_json()  # Parse the JSON data from the request

    # Validate incoming data
    if not data or not data.get('title') or not data.get('due_date') or not data.get('priority'):
        return jsonify({"msg": "Missing required fields"}), 400  # Return error if required fields are missing

    title = data['title']  # Get task title
    description = data.get('description', '')  # Get task description (default to empty string)
    due_date = data['due_date']  # Get task due date
    priority = data['priority']  # Get task priority

    # Create and save the new task
    new_task = Task(
        title=title,
        description=description,
        due_date=due_date,
        priority=priority,
        user_id=current_user_id
    )
    db.session.add(new_task)  # Add new task to the session
    db.session.commit()  # Commit the session to save the task

    # Return the newly created task as JSON response
    return jsonify({
        "id": new_task.id,
        "title": new_task.title,
        "description": new_task.description,
        "due_date": new_task.due_date,
        "priority": new_task.priority,
        "user_id": new_task.user_id,
        "created_at": new_task.created_at
    }), 201
