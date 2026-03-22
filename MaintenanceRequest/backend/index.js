require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'maintenance_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Initialize DB Tables
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS maintenance_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        room_location VARCHAR(255) NOT NULL,
        issue_description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        reported_at TIMESTAMP DEFAULT NOW(),
        resolved_at TIMESTAMP
      );
    `);
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ DB init error:', err);
  }
};

initDB();

// ─── ROUTES ────────────────────────────────────────────────────────────────────

// GET all requests
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM maintenance_requests ORDER BY reported_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats
app.get('/api/requests/stats', async (req, res) => {
  try {
    const open = await pool.query(
      "SELECT COUNT(*) FROM maintenance_requests WHERE status = 'Pending'"
    );
    const today = new Date().toISOString().split('T')[0];
    const resolved = await pool.query(
      `SELECT COUNT(*) FROM maintenance_requests WHERE status = 'Resolved' AND DATE(resolved_at) = $1`,
      [today]
    );
    res.json({
      openTasks: parseInt(open.rows[0].count),
      completedToday: parseInt(resolved.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new request
app.post('/api/requests', async (req, res) => {
  const { room_location, issue_description } = req.body;
  if (!room_location || !issue_description) {
    return res.status(400).json({ error: 'Room and description are required.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO maintenance_requests (room_location, issue_description)
       VALUES ($1, $2) RETURNING *`,
      [room_location, issue_description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH mark resolved
app.patch('/api/requests/:id/resolve', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE maintenance_requests
       SET status = 'Resolved', resolved_at = NOW()
       WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });    
  }
});

// DELETE request
app.delete('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM maintenance_requests WHERE id = $1', [id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
