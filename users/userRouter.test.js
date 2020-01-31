const userRouter = require("./userRouter.js");
const request = require('supertest');

describe('userRouter', function() {
  
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('GET / all users', function() {
        it('should return 200 OK', function() {
            return request(userRouter).get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
    })
})