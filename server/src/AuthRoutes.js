const db = require('../db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
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

const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5, // Limit each IP to 5 login requests per `window` 
  message: {
    status: 429,
    error: "Too many login attempts. Please try again in 2 minutes.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

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

  app.post('/api/v1/register', loginLimiter, (req, res) => {
    const { user, pass, key } = req.body;

    if (key != SECRET) {
      return res.status(500).json(DATABASE_ERROR);
    }

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
          res.json({ message: `Successfully registered ${user}` });
        });
      });
    });

  });

  app.post('/api/v1/login', loginLimiter, (req, res) => {
    const { user, pass } = req.body;

    console.log(user, pass);

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

  app.get('/api/v1/logout', (req, res) => {
    const user = req.session.userId;
    console.log(req.session);
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      console.log('User', user, 'logged out.');
      res.json({ message: 'Logged out successfully' });
    });
  });
}
