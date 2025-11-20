// frontend/src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            border: '1px solid #ddd',
            padding: '8px',
            marginBottom: '8px',
            borderRadius: '4px'
          }}
        >
          <div>{task.title}</div>
          <div style={{ fontSize: '12px', color: '#555' }}>
            {task.created_at ? new Date(task.created_at).toLocaleString() : ''}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
