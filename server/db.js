const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('database.db');

// Load schema
const schema = fs.readFileSync(path.join(__dirname, 'recipe_schema.sql'), 'utf8');
db.exec(schema, (err) => {
    if (err) {
        console.error('Error loading schema:', err.message);
    } else {
        console.log('Database initialized.');
    }
});

module.exports = db;