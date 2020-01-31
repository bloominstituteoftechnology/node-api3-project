const request = require('supertest');

const server = require('./server.js');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })
})

describe('GET /', function() {
    it('should return middleware message', function() {
        return request(server).get('/')
            .then(res => {
                expect(res.type).toMatch("text/html") // tests if it's a html or text string
            })
    })
})