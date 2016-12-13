const chai = require('chai');
const chaiHTTP = require('chai-http');

const should = chai.should();

chai.use(chaiHTTP);

let server;

beforeEach(function() {
    server = require('../server');
});

afterEach(function() {
    server.close();
});

describe('Blog API', function() {
    it ('Should return the blogs saved on server on GET', function (done) {
        chai.request(server)
        .get('/blog-poster')
        .end(function (err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.at.least(1);

            const expectedKeys = ['title', 'author', 'content', 'publishDate'];
                res.body.forEach(function (item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
                done();
        });
    });

      it('should add a blog post on POST', function(done) {
    const newItem = {title: 'coffee', content: 'lorem ipsum', author:'Me!', publishDate: 'now!' };
    chai.request(server)
      .post('/blog-poster')
      .send(newItem)
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
        res.body.id.should.not.be.null;
        // response should be deep equal to `newItem` from above if we assign
        // `id` to it from `res.body.id`
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
      done();
  });

   it('should update blogs on PUT', function(done) {
    chai.request(server)
      .get('/blog-poster')
      .end(function(err, res) {
        const updated = {
          title: 'foo',
          content: 'lorem ipsum bullshit',
          author: 'The other guy',
          publishDate: 'Tomorrow',
          id: res.body[0].id
        };
        chai.request(server)
          .put(`/blog-poster/${res.body[0].id}`)
          .send(updated)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.deep.equal(updated);
          });
      });
      done();
  });

    it('should delete blogs on DELETE', function(done) {
    chai.request(server)
      .get('/blog-poster')
      .end(function(err, res) {
        chai.request(server)
          .delete(`/blog-poster/${res.body[0].id}`)
          .end(function(err, res) {
            res.should.have.status(204);
          });
      })
      done();
  });

}); 
