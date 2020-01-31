const request = require('supertest');
const server = require('../api/server.js');

describe('userRouter', function() {
  
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('GET / all users', function() {
        it('should return 200 OK', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
    })

    describe('GET / error for all users', function() {
        it('should not return 500 error', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.status).not.toBe(500);
            })
        })
    })

    // describe('DELETE a user', function() {
    //     it('should return 200 and delete user', function() {
    //         return request(server).delete('/:id')
    //         .then(res => {
    //             expect(res.status).toBe(200);
    //         })
    //     })
    // })
})