import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import CreateProject from './CreateProject';
import CreateTask from './CreateTask';
import './Dashboard.css';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchProjects = async () => {
    const res = await axios.get('/projects');
    setProjects(res.data);
  };

  const fetchTasks = async (projectId) => {
    const res = await axios.get(`/tasks?projectId=${projectId}`);
    setTasks(res.data);
    setSelectedProjectId(projectId);
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <h3>Create Project</h3>
      <CreateProject onProjectCreated={fetchProjects} />

      <h3>Your Projects</h3>
      {projects.map((p) => (
        <div key={p._id} className="project-card">
          <h4>{p.name}</h4>
          <button onClick={() => fetchTasks(p._id)}>View Tasks</button>
        </div>
      ))}

      {selectedProjectId && (
        <div className="tasks-section">
          <h3>Create Task</h3>
          <CreateTask projectId={selectedProjectId} onTaskCreated={() => fetchTasks(selectedProjectId)} />
          <h3>Tasks</h3>
          {tasks.map((t) => (
            <div key={t._id} className="task-card">
              <strong>{t.title}</strong> - {t.status}<br/>
              {t.description}<br/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;


