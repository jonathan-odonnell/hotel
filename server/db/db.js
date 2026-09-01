const fs = require('fs');
const path = require ('path');
const { Pool } = require('pg');
const roomsData = require('../data.json');

// Create new database connection pool
const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, 'ca.pem')).toString(),
  },
});

// Check database connection
pool.connect().catch(err => {
  console.error('DB connection error:', err);
});

const initDb = async () => {
  try {
    // Create the hotels table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        slug VARCHAR(50) UNIQUE NOT NULL,
        type VARCHAR(50) NOT NULL,
        price NUMERIC NOT NULL CONSTRAINT price_check CHECK (price >= 100 AND price <= 1000),
        size INT NOT NULL CONSTRAINT size_check CHECK (size >= 200 AND size <= 1000),
        capacity INT NOT NULL CONSTRAINT capacity_check CHECK (capacity >= 1 AND capacity <= 10),
        pets BOOLEAN DEFAULT FALSE,
        breakfast BOOLEAN DEFAULT FALSE,
        featured BOOLEAN DEFAULT FALSE,
        description TEXT NOT NULL,
        extras VARCHAR[] NOT NULL,
        main_image VARCHAR(100) NOT NULL,
        details_image_1 VARCHAR(100) NOT NULL,
        details_image_2 VARCHAR(100) NOT NULL,
        details_image_3 VARCHAR(100) NOT NULL
      );
    `);
    console.log('Database tables verified or created successfully.');

    // Load initial data into the hotels table if it's empty
    const countRes = await pool.query('SELECT COUNT(*) FROM hotels');
    const rowCount = parseInt(countRes.rows[0].count);

    if (rowCount === 0) {
      console.log('Seeding initial data from data.json');

      for (const room of roomsData) {
        await pool.query(
          `INSERT INTO hotels (
            name, slug, type, price, size, capacity, pets, breakfast, featured,
            description, extras, main_image, details_image_1, details_image_2, details_image_3
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [
            room.name,
            room.slug,
            room.type,
            room.price,
            room.size,
            room.capacity,
            room.pets,
            room.breakfast,
            room.featured,
            room.description,
            room.extras,
            room.main_image,
            room.details_image_1,
            room.details_image_2,
            room.details_image_3
          ]
        );
      }

      // Sync primary key auto-increment sequence
      await pool.query(`
        SELECT setval(
          pg_get_serial_sequence('hotels', 'id'),
          COALESCE((SELECT MAX(id) FROM hotels), 1)
        );
      `);
      console.log('Initial seed data loaded successfully.');
    }
  // Catch any errors during database initialization
  } catch (err) {
    console.error('Error initialising database:', err);
  }
};

initDb();

module.exports = pool;