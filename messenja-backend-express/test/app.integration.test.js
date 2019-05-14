const request = require('supertest');
const app = require('../app'); //reference to you app.js file

describe('GET /messages', function () {
    it('respond with json containing a list of all messages', function (done) {
        request(app)
            .get('/messages')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
