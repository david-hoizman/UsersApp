const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create SQLite database and table if not exists
const dbPath = path.resolve(__dirname, './database.db');
const db = new sqlite3.Database(dbPath);

// db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    
    email TEXT NOT NULL UNIQUE,
    phoneNumber TEXT NOT NULL,
    role TEXT NOT NULL
  )`);
// });

// Routes
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  console.log('Received data:', req.body); 
 
  const sql = `INSERT INTO users (firstName, lastName, email, phoneNumber, role)
               VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [firstName, lastName, email, phoneNumber, role], function (err) {
    if (err) {
      console.log(err)
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, role } = req.body;

  const sql = `UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, role = ? WHERE id = ?`;
  db.run(sql, [firstName, lastName, email, phoneNumber, role, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ updated: this.changes });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ deleted: this.changes });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on 'http://192.168.1.22:3000/users'`);
});