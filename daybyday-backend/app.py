# app.py

from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

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

@app.route('/login', methods=['POST'])
def login():
    data = request.form
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:  # In a real app, use hashed passwords
        login_user(user)
        return redirect(url_for('dashboard'))
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/dashboard')
@login_required
def dashboard():
    return jsonify({"message": f"Welcome, {current_user.username}!"})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user
from wtforms import Form, StringField, DateField
from wtforms.validators import DataRequired, ValidationError
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)

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

@app.route('/login', methods=['POST'])
def login():
    data = request.form
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        login_user(user)
        return redirect(url_for('dashboard'))
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/create-task', methods=['POST'])
@login_required
def create_task():
    form = TaskForm(request.form)
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
