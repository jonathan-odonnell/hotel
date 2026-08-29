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
            error: "Failed to get rooms"
        });
    }
})

app.post('/api/rooms', upload.single('image'), async (req, res) => {

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

    const image = req.file.originalname;

    const slug = name.toLowerCase().replaceAll(" ", "-");

    let fields = [
        "name",
        "slug",
        "type",
        "price",
        "size",
        "capacity",
        "pets",
        "breakfast",
        "featured",
        "description",
        "extras",
        "image"
    ]

    let placeholders = fields.map((value, index) => `$${index + 1}`);

    let values = [
        name,
        slug,
        type,
        price,
        size,
        capacity,
        pets,
        breakfast,
        featured,
        description,
        extras,
        image
    ];

    let sql = `
        insert into hotels (${fields.join(", ")}) 
        values(${placeholders.join(", ")}) 
        returning *
    `;

     try {
        let results = await db.query(sql, values)
        res.status(201).json({
            room: results.rows[0]
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to add room"
        });
    }
})

app.put('/api/rooms/:id', upload.single('image'), async (req, res) => {
    
    let id = req.params.id

    let {
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

    let extras = JSON.parse(req.body.extras);
    
    let image = req.file ? req.file.originalname : null;

    let slug = name.toLowerCase().replaceAll(" ", "-");

    let fields = [
        "name = $1",
        "slug = $2",
        "type = $3",
        "price = $4",
        "size = $5",
        "capacity = $6",
        "pets = $7",
        "breakfast = $8",
        "featured = $9",
        "description = $10",
        "extras = $11"
    ];

    let values = [
        name,
        slug,
        type,
        price,
        size,
        capacity,
        pets,
        breakfast,
        featured,
        description,
        extras
    ];

    if (image) {
        fields.push(`image = $${fields.length + 1}`);
        values.push(req.file.originalname);
    }

    values.push(id);

    let sql = `
        update hotels
        set ${fields.join(", ")}
        where id = $${values.length}
        returning *
    `;

     try {
        const results = await db.query(sql, values)
        res.status(200).json({
            room: results.rows[0]
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to update room"
        });
    }
})

app.delete('/api/rooms/:id', async (req, res) => {
    try {
        await db.query('delete from hotels where id = $1', [req.params.id])
        res.status(204);
    } catch (err) {
        res.status(500).json({
            error: "Failed to delete room"
        });
    }
});


app.get('/\{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});