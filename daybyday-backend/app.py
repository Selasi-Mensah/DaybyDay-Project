# app.py

from flask import Flask, request, jsonify
from wtforms import Form, StringField, DateField
from wtforms.validators import DataRequired, ValidationError
import datetime

app = Flask(__name__)

# Define the form class with validation rules
class TaskForm(Form):
    title = StringField('Title', validators=[DataRequired(message="Title is required")])
    description = StringField('Description', validators=[DataRequired(message="Description is required")])
    due_date = DateField('Due Date', validators=[DataRequired(message="Due date is required")])

    # Custom validator to check if the due date is in the future
    def validate_due_date(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("Due date must be in the future")

# Route to handle task creation
@app.route('/create-task', methods=['POST'])
def create_task():
    form = TaskForm(request.form)  # Bind form data from the request

    if form.validate():  # Validate the form
        # Extract validated data
        title = form.title.data
        description = form.description.data
        due_date = form.due_date.data

        # Here you would add code to save the task to the database

        # Return success response with task data
        return jsonify({"message": "Task created successfully", "task": {
            "title": title,
            "description": description,
            "due_date": due_date.isoformat()
        }}), 201
    else:
        # Return validation errors
        return jsonify({"errors": form.errors}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
