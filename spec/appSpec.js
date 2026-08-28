const Jasmine = require('jasmine');
const runner = new Jasmine();
const request = require('supertest');
const app = require('../server/app');


describe("Hotels data API tests", () => {
  it("API returns a HTTP status of 200 and data for 13 rooms including single economy",
    async () => {
        const res = await request(app).get('/hotels/');
        expect(res.status).toBe(200);
        expect(res.body.hotels).toBeDefined();
        expect(Array.isArray(res.body.hotels).toBeTrue());
        expect(length(res.hotels.body).toBe(13));   
        expect(res.body.hotels[0].name).toBe("single economy");
  });
});

describe("React app tests", () => {
    it("Home page returns status 200 and contains the presidential featured room HTML", 
        async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.text).toContain("<!DOCTYPE html");
            expect(res.text).toContain("<p className=\"room-info\">presidential</p>")
            expect(res.text).not.toContain("<h4>rooms data loading....</h4>")
    })
    it("Rooms page returns status 200 and contains the family standard room HTML", 
        async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.text).toContain("<!DOCTYPE html");
            expect(res.text).toContain("<p className=\"room-info\">family standard</p>")
            expect(res.text).not.toContain("<h4>rooms data loading....</h4>")
    })
    it("Single rooms page returns status 200 and contains the double deluxe HTML", 
        async () => {
            const res = await request(app).get('/rooms/double-deluxe');
            expect(res.status).toBe(200);
            expect(res.text).toContain("<!DOCTYPE html");
            expect(res.text).toContain("<h1>double deluxe room</h1>")
            expect(res.text).not.toContain("<h3> no such room could be found...</h3>")
    })
    it("Error page returns status 200 and contains the error HTML",
        async () => {
            const res = await request(app).get('/error');
            expect(res.status).toBe(200);
            expect(res.text).toContain("<!DOCTYPE html");
            expect(res.text).toContain("<h1>404</h1>")
    })
})

if (require.main === module) {
  runner.execute()
}