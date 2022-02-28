const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../src/server');

//Chai middleware use
chai.use(chaiHttp);

describe('Node Server testing', () => {
  it('Ana sayfa test işlemleri', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
