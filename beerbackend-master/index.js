const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true, quiet: true });

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_REMOTE_HOST || process.env.DB_HOST,
  user: process.env.DB_REMOTE_USER || process.env.DB_USER,
  password: process.env.DB_REMOTE_PASS || process.env.DB_PASS,
  database: process.env.DB_REMOTE_DATABASE || process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const MAX_PONG_TEAMS = 64;
const EVENT = {
  name: 'Beer Olympics VI',
  date: '2026-07-23',
  location: 'Leona Lux - Radovis',
  description: 'Beer Olympics VI Beer Pong Duos tournament',
};

async function nextId(connection, table) {
  const [rows] = await connection.query(`SELECT COALESCE(MAX(id), 0) + 1 AS id FROM \`${table}\``);
  return rows[0].id;
}

async function getEventId(connection) {
  const [events] = await connection.execute(
    'SELECT id FROM `event` WHERE name = ? AND date = ? ORDER BY id DESC LIMIT 1',
    [EVENT.name, EVENT.date],
  );
  if (events.length) return events[0].id;

  const id = await nextId(connection, 'event');
  await connection.execute(
    'INSERT INTO `event` (id, name, date, location, description) VALUES (?, ?, ?, ?, ?)',
    [id, EVENT.name, EVENT.date, EVENT.location, EVENT.description],
  );
  return id;
}

app.get('/', async (_req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const eventId = await getEventId(connection);
      const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM `registration` WHERE event_id = ?', [eventId]);
      res.json({ pongSpacesLeft: Math.max(0, MAX_PONG_TEAMS - rows[0].count) });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Could not load registration spaces:', error.message);
    res.status(503).json({ success: false, msg: 'Registration database is unavailable.' });
  }
});

app.post('/', async (req, res) => {
  const name = req.body.name?.trim();
  const teammate = req.body.teammate?.trim();
  const teamName = req.body.team?.trim();

  if (!name || !teammate || !teamName) {
    return res.status(400).json({ success: false, msg: 'Please input all fields.' });
  }
  if (name.toLowerCase() === teammate.toLowerCase()) {
    return res.status(400).json({ success: false, msg: 'Members of the team cannot be the same person.' });
  }
  if (teamName.length > 100) {
    return res.status(400).json({ success: false, msg: 'Team name must be 100 characters or fewer.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const eventId = await getEventId(connection);
    const [registeredTeams] = await connection.execute(
      `SELECT t.name
       FROM \`team\` t
       INNER JOIN \`registration\` r ON r.team_id = t.id
       WHERE r.event_id = ? AND LOWER(t.name) = LOWER(?)`,
      [eventId, teamName],
    );
    if (registeredTeams.length) {
      await connection.rollback();
      return res.status(409).json({ success: false, msg: 'Team name already taken.' });
    }

    const [registrations] = await connection.execute('SELECT COUNT(*) AS count FROM `registration` WHERE event_id = ?', [eventId]);
    if (registrations[0].count >= MAX_PONG_TEAMS) {
      await connection.rollback();
      return res.status(409).json({ success: false, msg: 'No more spaces left for Beer Pong.' });
    }

    const teamId = await nextId(connection, 'team');
    await connection.execute('INSERT INTO `team` (id, name) VALUES (?, ?)', [teamId, teamName]);

    const registrationId = await nextId(connection, 'registration');
    await connection.execute(
      'INSERT INTO `registration` (id, contact_name, team_id, event_id) VALUES (?, ?, ?, ?)',
      [registrationId, `${name} & ${teammate}`, teamId, eventId],
    );

    await connection.commit();
    return res.status(201).json({
      success: true,
      msg: 'You have been registered for Beer Pong!',
      teamName,
      firstPerson: name,
      teammate,
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Team registration failed:', error.message);
    return res.status(503).json({ success: false, msg: 'Registration database is unavailable.' });
  } finally {
    if (connection) connection.release();
  }
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Registration server started on port ${port}`));
}

module.exports = app;
