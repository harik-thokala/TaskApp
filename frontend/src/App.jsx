// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks when component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      const newTask = await res.json();

      if (!res.ok) {
        console.error('Server error:', newTask.error);
        return;
      }

      // Add new task to top of list
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h1>Task Tracker</h1>
      <p>Simple full-stack app using React + Node + MySQL.</p>

      <TaskForm onAddTask={addTask} />

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}

export default App;
