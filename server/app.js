const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
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

app.post('/api/room', upload.single('image'), async (req, res) => {
    const {
        name,
        type,
        price,
        size,
        capacity,
        pets,
        breakfast,
        featured,
        description, 
    } = req.body;
    const extras = JSON.parse(req.body.extras);
    const image = req.file.originalname
    const slug = name.toLower().replace(" ", "-")
     try {
        const results = await db.query(
            `insert into hotels (
            name, slug, type, price, size, capacity, pets, breakfast, featured, description, extras, image)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`,
            [name, slug, type, price, size, capacity, pets, breakfast, featured, description, extras, image])
        res.status(201).json({
            hotels: results.rows[0]
        })
    } catch (err) {
        res.status(500);
    }
})



app.get('/\{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});