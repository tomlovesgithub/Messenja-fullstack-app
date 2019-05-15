const request = require('supertest');
const app = require('../app');
// API should be able to recieve messages

describe('POST /messages', function () {
  let data = {
    "content": "test-message"
  }
  it('respond with 201 created', function (done) {
    request(app)
    .post('/messages')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      done();
    });
  });
});

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
      .get('/messages/message/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });
});
