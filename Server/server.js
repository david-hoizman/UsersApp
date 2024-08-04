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

// Ensure table creation
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phoneNumber TEXT NOT NULL,
      role TEXT NOT NULL
    )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
});

// Routes
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error retrieving users:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  const sql = `INSERT INTO users (firstName, lastName, email, phoneNumber, role)
               VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [firstName, lastName, email, phoneNumber, role], function (err) {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

<<<<<<< HEAD
// Route to update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  
  // Create the SQL query to update the user's data
  const sql = `UPDATE users
               SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, role = ?
               WHERE id = ?`;

  // Execute the SQL query
  db.run(sql, [firstName, lastName, email, phoneNumber, role, id], function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
    // Check if any rows were affected
=======
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  const sql = `UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, role = ? WHERE id = ?`;
  db.run(sql, [firstName, lastName, email, phoneNumber, role, id], function (err) {
    if (err) {
      console.error('Error updating user:', err.message);
      return res.status(400).json({ error: err.message });
    }
>>>>>>> 147c3fb4f66ac2e8232acdb9d614714b7ed0e036
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ updated: this.changes });
  });
});

<<<<<<< HEAD

=======
>>>>>>> 147c3fb4f66ac2e8232acdb9d614714b7ed0e036
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ deleted: this.changes });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on 'http://localhost:${port}/users'`);
});
