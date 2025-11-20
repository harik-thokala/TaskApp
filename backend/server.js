// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// GET /api/tasks - get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tasks - create a new task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const [result] = await db.execute('INSERT INTO tasks (title) VALUES (?)', [title]);
    const newTask = {
      id: result.insertId,
      title,
      created_at: new Date()
    };
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
