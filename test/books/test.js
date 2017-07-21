process.env.PORT = 3000;

const chai = require('chai');
const chatHttp = require('chai-http');
const app = require('../../server');
const should = chai.should();
const expect = chai.expect;
chai.use(chatHttp);

describe('books', () => {
    it('should print "list the books"', (done) => {
        chai.request(app)
        .get('/books/list')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).to.have.string('books');
            done();
        })
    })
    it('should match text of "Hello"', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).to.have.string('Hello');
            done();
        })
    })
    it('should have 200 status code', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })


})

