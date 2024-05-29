# app.py

from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from flask_cors import CORS
from wtforms import Form, StringField, DateField
from wtforms.validators import DataRequired, ValidationError
import datetime

CORS(app)  # Enable CORS for all routes
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    tasks = db.relationship('Task', backref='user', lazy=True)

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class TaskForm(Form):
    title = StringField('Title', validators=[DataRequired(message="Title is required")])
    description = StringField('Description', validators=[DataRequired(message="Description is required")])
    due_date = DateField('Due Date', validators=[DataRequired(message="Due date is required")])

    def validate_due_date(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("Due date must be in the future")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/tasks', methods=['GET'])
@login_required
def get_tasks():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    tasks_data = [{"id": task.id, "title": task.title, "description": task.description, "due_date": task.due_date.isoformat()} for task in tasks]
    return jsonify(tasks_data)

@app.route('/create-task', methods=['POST'])
@login_required
def create_task():
    form = TaskForm(request.get_json())
    if form.validate():
        task = Task(
            title=form.title.data,
            description=form.description.data,
            due_date=form.due_date.data,
            user_id=current_user.id  # Associate task with the logged-in user
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"message": "Task created successfully", "task": {
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date.isoformat()
        }}), 201
    else:
        return jsonify({"errors": form.errors}), 400

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
