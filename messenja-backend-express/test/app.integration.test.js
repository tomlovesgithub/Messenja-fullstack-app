const request = require('supertest');
const app = require('../app');

// API should be able to post messages
context('POST /messages', function functionName() {
  describe('success', function () {
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
  // API errors on bad message post
  describe('error', function () {
    let data = {
      "content": ""
    }
    it('respond with 400 not created', function (done) {
      request(app)
      .post('/messages')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({error: "message not created"}) // expecting content value
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });
});
// API should be able to display all messages
// API can return a single message from given message ID
context('GET /messages', function () {
  describe('all', function () {
    it('respond with json containing a list of all messages', function (done) {
      request(app)
      .get('/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });
  describe('success', function () {
    it('respond with json containing a single message', function (done) {
      request(app)
      .get('/messages/message/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });
  describe('failure', function () {
    let data = {
      "id": "false_id"
    }
    it('respond with json message not found', function (done) {
      request(app)
      .get('/messages/message/idisnonexisting')
      .send(data)
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
})
