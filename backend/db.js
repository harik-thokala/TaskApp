// backend/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // change if needed
  password: 'Nvphari@123',       // add your password if you have one
  database: 'task_app'
});

module.exports = pool.promise();
