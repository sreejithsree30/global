import React from 'react';
;
import './TaskSection.css';

function TaskSection({tasks}) {
  return (
    <div className="tasks-section">
      <h3>Tasks</h3>
      {tasks.map((t) => (
        <div key={t._id} className="task-card">
          <strong>{t.title}</strong> - {t.status}<br />
          {t.description}<br />
        </div>
      ))}
    </div>
  );
}

export default TaskSection;
