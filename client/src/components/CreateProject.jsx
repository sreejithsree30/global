import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';

function CreateProject({ onProjectCreated }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/projects', { name });
      setName('');
      onProjectCreated?.();
  
      navigate(`/projects/${res.data._id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-project-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateProject;


