require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 3000;
const db = require('./db/db')
const storage = require('./storage/storage')
const multer = require('multer');
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors())
app.use(express.json())

app.get('/api/config/cloudinary', (req, res) => {
    // Returns the Cloudinary cloud name
    res.json({ cloudName: process.env.CLOUD_NAME });
});

app.get('/api/rooms', async (req, res) => {
    // Get all rooms from the database
    try {
        const results = await db.query('select * from hotels order by id')
        res.status(200).json({
            status: 'success',
            rooms: results.rows
        })
    // Catch any errors
    } catch (err) {
        res.status(500).json({
            error: 'Failed to get rooms'
        });
    }
})

app.post('/api/rooms', upload.single('image'), async (req, res) => {
    // Construct query for adding a new room to the database
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
    const main_image = req.file ? req.file.path.split('/').pop(): null;
    const details_image_1 = 'details-3.jpg';
    const details_image_2 = 'details-2.jpg';
    const details_image_3 = 'details-4.jpg';
    const slug = name.toLowerCase().replaceAll(' ', '-');

    const fields = [
        'name',
        'slug',
        'type',
        'price',
        'size',
        'capacity',
        'pets',
        'breakfast',
        'featured',
        'description',
        'extras',
        'main_image',
        'details_image_1',
        'details_image_2',
        'details_image_3'
    ]

    const placeholders = fields.map((value, index) => `$${index + 1}`);

    const values = [
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
        main_image,
        details_image_1,
        details_image_2,
        details_image_3
    ];

    const sql = `
        insert into hotels (${fields.join(', ')}) 
        values(${placeholders.join(', ')}) 
        returning *
    `;

    // Try to add the new room to the database
    try {
        const results = await db.query(sql, values)
        res.status(201).json({
            status: 'success',
            room: results.rows[0]
        })
    
    // Catch any errors
    } catch (err) {
        res.status(500).json({
            error: 'Failed to add room'
        });
    }
})

app.put('/api/rooms/:id', upload.single('image'), async (req, res) => {  
    // Construct query for adding a updating the room in the database  
    const id = req.params.id

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
    const main_image = req.file ? req.file.path.split('/').pop() : null;
    const details_image_1 = 'details-3.jpg';
    const details_image_2 = 'details-2.jpg';
    const details_image_3 = 'details-4.jpg';
    const slug = name.toLowerCase().replaceAll(' ', '-');

    let fields = [
        'name = $1',
        'slug = $2',
        'type = $3',
        'price = $4',
        'size = $5',
        'capacity = $6',
        'pets = $7',
        'breakfast = $8',
        'featured = $9',
        'description = $10',
        'extras = $11'
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

    if (main_image) {
        fields.push(`main_image = $${fields.length + 1}`);
        values.push(main_image, details_image_1, details_image_2, details_image_3);
    }

    values.push(id);

    let sql = `
        update hotels
        set ${fields.join(', ')}
        where id = $${values.length}
        returning *
    `;

    // Try to update the room in the database
     try {
        const results = await db.query(sql, values)
        res.status(200).json({
            status: 'success',
            room: results.rows[0]
        })
    // Catch any errors
    } catch (err) {
        res.status(500).json({
            error: 'Failed to update room'
        });
    }
})

app.delete('/api/rooms/:id', async (req, res) => {
    // Try to delete the room from the database
    try {
        await db.query('delete from hotels where id = $1', [req.params.id])
        res.status(204).json({
            status: 'success'
        });
    // Catch any errors
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete room'
        });
    }
});


app.get('/\{*splat}', (req, res) => {
    // Serve the react index.html file for any route that doesn't match the API routes
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = server