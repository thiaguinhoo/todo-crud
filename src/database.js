const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
  path.resolve(__dirname, '..', 'data.sqlite')
);

db.run(
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT
  )`
);

module.exports = db;

