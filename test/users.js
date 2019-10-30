// My First Test 
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Users = require('../api/user/userRoutes');

// Setup 
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should()
var baseUrl = '/api/'
var users = baseUrl + 'users/'
var register = baseUrl + 'register/'
var roommates = baseUrl + 'roommates/'
var contentType = 'content-type'
var applicationJson = 'application-json'


chai.use(chaiHttp);

// Test Get 
describe('/GET user', () => {
    it('Should Get List of users ', (done) => {
        chai.request(server)
        .get('/api/users')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        });
    });
});

describe('/Register User', () => {
    it('Should Register User', (done) => {
        chai.request(server)
            .post('/api/users/register')
            .set(contentType, applicationJson)
            .send({
                "name": "raju23",
                "phone": 123,
                "username": "raju123",
                "password": "123"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        
    });
}); 