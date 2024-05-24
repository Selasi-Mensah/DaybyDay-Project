from . import db
from datetime import datetime

# User model for storing user details
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    username = db.Column(db.String(80), nullable=False, unique=True)  # Username (must be unique)
    email = db.Column(db.String(120), nullable=False, unique=True)  # Email (must be unique)
    password_hash = db.Column(db.String(128), nullable=False)  # Password hash for security

# Task model for storing task details
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    title = db.Column(db.String(120), nullable=False)  # Task title
    description = db.Column(db.Text, nullable=True)  # Task description
    due_date = db.Column(db.Date, nullable=False)  # Task due date
    priority = db.Column(db.String(10), nullable=False)  # Task priority (e.g., Low, Medium, High)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Foreign key to the User model
    user = db.relationship('User', backref=db.backref('tasks', lazy=True))  # Relationship to the User model
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of task creation
