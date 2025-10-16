const db = require('../db');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const SECRET = process.env.SECRET;
const SALT_ROUNDS = 10;

const DATABASE_ERROR = { error: 'Database error' }
const CREDENTIALS_ERROR = { error: 'Invalid credentials' }

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

module.exports = app => {
  app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true in production with HTTPS
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60
    }
  }));

  app.post('/api/v1/register', (req, res) => {
    const { user, pass } = req.body;

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          console.error('Error hashing password.', err);
          res.status(500).json(DATABASE_ERROR);
          return;
        }

        const stmt = db.prepare('INSERT INTO users (user, password) VALUES (?, ?)');
        stmt.run(user, hash, function (err) {
          if (err) {
            console.error('User already exists or error occurred.', err);
            return res.status(400).json({ message: 'User already exists or error occurred.' });
          }
          res.json({ message: 'Successfully registered.' });
        });
      });
    });

  });

  app.post('/api/v1/login', (req, res) => {
    const { user, pass } = req.body;

    const sql = 'SELECT * FROM users WHERE user = ?';

    db.get(sql, [user], (err, row) => {
      if (err) {
        console.error('Error fetching user.', err);
        res.status(500).json(DATABASE_ERROR);
        return;
      }

      if (!row) {
        console.error('Failed to fetch user.');
        res.status(500).json(CREDENTIALS_ERROR);
        return;
      }

      const hash = row.password;

      bcrypt.compare(pass, hash, function (err, result) {
        if (err) {
          console.error('Comparison error:', err);
          res.status(500).json(DATABASE_ERROR);
          return;
        }

        if (result) {
          console.log('User', row.user, 'logged in.');
          req.session.userId = row.id;
          res.status(201).json({ message: 'Logged in successfully.' });
        } else {
          console.error('Comparison error:', err);
          res.status(500).json(CREDENTIALS_ERROR);
        }
      });
    });
  });

  app.get('/api/v1/dashboard', isAuthenticated, (req, res) => {
    res.json({ message: `Welcome user ${req.session.userId}!` });
  });
}
