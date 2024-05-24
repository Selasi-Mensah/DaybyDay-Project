from app import create_app, db
from app.models import User, Task

# Create the Flask application
app = create_app()

# Shell context for flask CLI
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Task': Task}  # Add models to shell context for easy access

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for development
