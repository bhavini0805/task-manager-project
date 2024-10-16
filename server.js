require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Create MySQL connection
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

// GET all tasks
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  connection.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, title, description });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});