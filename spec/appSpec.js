const Jasmine = require('jasmine');
const runner = new Jasmine();
const request = require('supertest');
const app = require('../server/app');
const db = require('../server/db/db');


describe("Rooms data API tests", () => {
  it("API get rooms returns a HTTP status of 200 and data for 5 rooms",
    async () => {
        const fakeRooms = [
            { name: 'single basic' },
            { name: 'single economy' },
            { name: 'double deluxe' },
            { name: 'family standard' },
            { name: 'presidential' }
        ];
        spyOn(db, 'query').and.returnValue(Promise.resolve({ rows: fakeRooms }));
        const res = await request(app).get('/api/rooms');
        expect(res.status).toBe(200);
        expect(res.body.rooms).toBeDefined();
        expect(Array.isArray(res.body.rooms)).toBeTrue();
        expect(res.body.rooms.length).toBe(5);   
        expect(res.body.rooms[0].name).toBe('single basic');
  });
  it("API add room view returns a HTTP status of 201 and room data",
    async () => {
        const fakeRooms = [
            { name: 'double deluxe' },
        ];
        spyOn(db, 'query').and.returnValue(Promise.resolve({ rows: fakeRooms }));
        const res = await request(app)
            .post('/api/rooms')
            .field('name', 'double deluxe')
            .field('type', 'double')
            .field('price', 400)
            .field('size', 500)
            .field('capacity', 2)
            .field('pets', false)
            .field('breakfast', true)
            .field('featured', false)
            .field('description', 'test description')
            .field('extras', JSON.stringify(['an extra']))
            ;
        expect(res.status).toBe(201);
        expect(res.body.room).toBeDefined();
        expect(
            res.body.room !== null 
            && typeof(res.body.room) === 'object' 
            && !Array.isArray(res.body.room)
        ).toBeTrue();
        expect(res.body.room.name).toBe('double deluxe');
  });
  it("API update room view returns a HTTP status of 200 and room data",
    async () => {
        const fakeRooms = [
            { name: 'presidential' },
        ];
        spyOn(db, 'query').and.returnValue(Promise.resolve({ rows: fakeRooms }));
        const res = await request(app)
            .put('/api/rooms/1')
            .field('name', 'presidential')
            .field('type', 'presidential')
            .field('price', 600)
            .field('size', 1000)
            .field('capacity', 10)
            .field('pets', false)
            .field('breakfast', true)
            .field('featured', true)
            .field('description', 'test description')
            .field('extras', JSON.stringify(['an extra']))
            ;
        expect(res.status).toBe(200);
        expect(res.body.room).toBeDefined();
        expect(typeof(res.body.room)).toBe('object');  
        expect(res.body.room.name).toBe('presidential');
  });
  it("API delete room view returns a HTTP status of 204 and no data",
    async () => {
        spyOn(db, 'query').and.returnValue(Promise.resolve({ rows: 1 }));
        const res = await request(app).delete('/api/rooms/1');
        expect(res.status).toBe(204);
        expect(res.body.rooms).not.toBeDefined();
  });
});

describe("React app tests", () => {
    it("Home page returns status 200 and contains HTML", 
        async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    });
    
    it("Rooms page returns status 200 and contains HTML", 
        async () => {
            const res = await request(app).get('/rooms');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    })
    it("Single rooms page returns status 200 and contains HTML", 
        async () => {
            const res = await request(app).get('/rooms/double-deluxe');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    })
    it("Add room page returns status 200 and contains HTML", 
        async () => {
            const res = await request(app).get('/rooms/add');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    })
    it("Update room page returns status 200 and contains HTML", 
        async () => {
            const res = await request(app).get('/rooms/double-deluxe/update');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    })
    it("Error page returns status 200 and contains the error HTML",
        async () => {
            const res = await request(app).get('/error');
            expect(res.status).toBe(200);
            expect(res.text).toContain('<html lang="en">');
    })
})

if (require.main === module) {
  runner.execute()
}