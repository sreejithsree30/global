import React, { useState } from 'react';
import axios from '../api/axios';
import './CreateTask.css';

function CreateTask({ projectId, onTaskCreated }) {
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', { ...formData, projectId });
      setFormData({ title: '', description: '', status: 'Pending' });
      onTaskCreated();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default CreateTask;
