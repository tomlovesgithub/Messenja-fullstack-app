const request = require('supertest');
const app = require('../app');

// API should be able to post messages
context('POST /messages', function () {
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
// API should be able to display messages
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
// API should be able to delete messages
context('UPDATE /messages', function () {
  describe('success', function () {
    let data = {
      "content": "updated",
      "id": "5cdc4a58832fc531cd622d3d"
    }
    it('respond with 201 updated', function (done) {
      request(app)
      .put('/messages/updatemessage/5cdc4a58832fc531cd622d3d')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      done();
    });
  });
  // API errors on bad message update
  describe('error', function () {
    let data = {
      "content": "bad update",
      "id": "1234"
    }
    it('respond with 400 not created', function (done) {
      request(app)
      .put('/messages/updatemessage/1234')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({error: "message not updated"}) // expecting content value
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });
});
