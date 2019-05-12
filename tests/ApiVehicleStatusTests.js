const { expect, assert } = require('chai');
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent('https://api.mercedes-benz.com/vehicledata_tryout/v1');
var token = '4c4c444c-v123-4123-s123-4c4c444c4c44';
var vehicleId = 'WDB111111ZZZ22222';

describe('Vehicle Status API tests', function(){

    it('GET request withous token', function(done){
        server
        .get(`/vehicles/${vehicleId}/containers/vehiclestatus`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.exveErrorMsg.should.equal('Unauthorized');
            done();
        });
    });

    it('GET /vehicles/${vehicleId}/resources/decklidstatus', function(){
        server
        .get(`/vehicles/${vehicleId}/resources/decklidstatus`)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.decklidstatus.value).to.be.equal('false');
            expect(response.body.decklidstatus.timestamp).to.be.a('number');
        });
    });

    it('GET /vehicles/{vehicleId}/resources/doorstatusfrontleft', function(done){
        server
        .get(`/vehicles/${vehicleId}/resources/doorstatusfrontleft`)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            expect(res.body.doorstatusfrontleft.value).equal('false');
            expect(res.body.doorstatusfrontleft.timestamp).to.be.a('number');
            done();
        });
    });
});