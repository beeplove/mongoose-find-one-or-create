'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    findOneOrCreate = require('../'),
    PersonSchema = new mongoose.Schema({name: String, age: Number}),
    Person = null,
    db = null;

var empty = function (done) {
    Person.remove({}, function() {
        done();
    })
};

describe('Spec of findOneOrCreate(condition, document, callback)', function () {
    before(function (done) {
        mongoose.connect('mongodb://localhost/findOneOrCreate');

        mongoose.connection.on('error', function (err) {
            console.log('Mongo Error: ' + err.message);
        });

        db = mongoose.connection.db;
        PersonSchema.plugin(findOneOrCreate);
        Person = mongoose.model('Person', PersonSchema);
        Person.create({name: 'Adam', age: 99}, function() {
            done();
        });
    });

    after(function (done) {
        db.dropDatabase(function () {
            done();
        });
    });

    describe('when no document matches with condition in collection', function () {
        afterEach(function (done) {
            empty(done);
        });

        it('should create document', function (done) {
            Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 21}, function (err, person) {
                person.name.should.equal('Mohammad');
                person.age.should.equal(21);
                done();
            });
        });
    });

    describe('when one document exists in collection', function () {
        beforeEach(function (done) {
            Person.create({name: 'Mohammad', age: 22}, function (err, person) {
                done();
            });
        });

        afterEach(function (done) {
            empty(done);
        });
        
        it('should return existing document', function (done) {
            Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 22}, function (err, person) {
                person.name.should.equal('Mohammad');
                person.age.should.equal(22);
                done();
            });
        });

        it('should return existing document regardless document specified in param', function (done) {
            Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 21}, function (err, person) {
                person.name.should.equal('Mohammad');
                person.age.should.equal(22);
                done();
            });
        });
    });

    describe('when more than one document exists in collection with same condition', function () {
        beforeEach(function (done) {
            Person.create([{name: 'Mohammad', age: 21}, {name: 'Mohammad', age: 22}], function (err, person) {
                done();
            });
        });

        afterEach(function (done) {
            empty(done);
        });
        
        it('should return one document', function (done) {
            Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 22}, function (err, person) {
                person.name.should.equal('Mohammad');
                done();
            });
        });

        it('should return one document regardless document specified in param', function (done) {
            Person.findOneOrCreate({name: 'Mohammad'}, {name: 'Mohammad', age: 21}, function (err, person) {
                person.name.should.equal('Mohammad');
                done();
            });
        });
    });
});
