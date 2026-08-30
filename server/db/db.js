const pg = require('pg');
const fs = require('fs')

const db = new pg.Client ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
  },
});

db.connect().catch(err => {
  console.error('DB connection error:', err);
});

module.exports = db;