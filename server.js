require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'task_manager'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// GET all tasks (excluding done tasks)
app.get('/tasks', (req, res) => {
  connection.query(
    'SELECT * FROM tasks WHERE status != "done" ORDER BY CASE priority WHEN "high" THEN 1 WHEN "medium" THEN 2 WHEN "low" THEN 3 END, created_at DESC',
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

// POST a new task
app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  connection.query(
    'INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)',
    [title, description, priority || 'medium'],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ 
        id: result.insertId, 
        title, 
        description, 
        priority: priority || 'medium',
        status: 'todo' 
      });
    }
  );
});

// UPDATE task status
app.put('/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  connection.query(
    'UPDATE tasks SET status = ? WHERE id = ?',
    [status, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, status });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});