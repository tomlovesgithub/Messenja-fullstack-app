const request = require('supertest');
const app = require('../app');

// API should be able to display all messages
context('api tests', function () {
  describe('GET /messages', function () {
    it('respond with json containing a list of all messages', function (done) {
      request(app)
      .get('/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  // API can return a single message from given message ID

  describe('GET /messages/:id', function () {
    it('respond with json containing a single message', function (done) {
      request(app)
      .get('/messages/message/5cdc4a58832fc531cd622d3d')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

// Api should error on retrival of invalid ID

  describe('GET /messages/:id', function () {
    it('respond with json message not found', function (done) {
      request(app)
      .get('/messages/message/idisnonexisting')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) //expecting HTTP status code
      .expect({error: "message not found"}) // expecting content value
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });
