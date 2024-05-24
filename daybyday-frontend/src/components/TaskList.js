import React, { useEffect } from 'react'; // Import React and useEffect hook
import TaskItem from './TaskItem'; // Import TaskItem component

const TaskList = ({ tasks, refreshTasks }) => {
  // Use useEffect to refresh the task list when the component mounts
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]); // Dependency array ensures this effect runs only when refreshTasks changes

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} /> // Render TaskItem for each task
      ))}
    </div>
  );
};

export default TaskList;
