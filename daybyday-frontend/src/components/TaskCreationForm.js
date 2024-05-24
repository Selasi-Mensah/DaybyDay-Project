import React, { useState } from 'react';

const TaskCreationForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes and update the formData state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate form inputs and update errors state
  const validate = () => {
    const newErrors = {};
    
    // Check if title is provided
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    // Check if description is provided
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    // Check if due date is provided and is a valid date
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const date = new Date(formData.dueDate);
      if (isNaN(date.getTime())) {
        newErrors.dueDate = 'Due date is not a valid date';
      }
    }

    // Update errors state with validation messages
    setErrors(newErrors);

    // Return true if there are no validation errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) {
      // If form data is valid, submit it (e.g., API call)
      console.log('Form data is valid. Submitting:', formData);
    } else {
      // If form data is invalid, do not submit
      console.log('Form data is invalid. Not submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>} {/* Display title validation error */}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>} {/* Display description validation error */}
      </div>

      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>} {/* Display due date validation error */}
      </div>

      <button type="submit">Create Task</button> {/* Submit form button */}
    </form>
  );
};

export default TaskCreationForm;