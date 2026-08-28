const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 3000;
const fs = require('fs');
const pg = require('pg');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors())
app.use(express.json())

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

app.get('/api/hotels', async (req, res) => {
    try {
        const results = await db.query('select * from hotels')
        res.status(200).json({
            hotels: results.rows
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
})

app.get('/\{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});