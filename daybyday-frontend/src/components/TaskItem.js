import React from 'react'; // Import React

const TaskItem = ({ task }) => {
  return (
    <div>
       <li>
      <h3>{task.title}</h3> {/* Display task title */}
      <p>{task.description}</p> {/* Display task description */}
      <p>Due: {task.due_date}</p> {/* Display task due date */}
      <p>Priority: {task.priority}</p> {/* Display task priority */}
      </li>
    </div>
  );
};

export default TaskItem;