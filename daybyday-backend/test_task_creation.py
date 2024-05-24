import unittest
from app import app, db, User, Task

class TestTaskCreation(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_task_creation(self):
        # Create a test user
        user = User(username='testuser', password='testpassword')
        db.session.add(user)
        db.session.commit()

        # Login with the test user
        login_response = self.app.post('/login', data=dict(
            username='testuser',
            password='testpassword'
        ), follow_redirects=True)
        self.assertEqual(login_response.status_code, 200)

        # Create a task
        task_data = {
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2024-12-31'
        }
        create_task_response = self.app.post('/create-task', data=task_data)
        self.assertEqual(create_task_response.status_code, 201)

        # Check if the task is created in the database
        task = Task.query.filter_by(title='Test Task').first()
        self.assertIsNotNone(task)
        self.assertEqual(task.title, 'Test Task')
        self.assertEqual(task.description, 'This is a test task')
        self.assertEqual(task.due_date.isoformat(), '2024-12-31')

if __name__ == '__main__':
    unittest.main()
