var tape = require('tape');
var server = require('../src/server.js');
var shot = require('shot');
var redis = require('../src/redis.js');
var fs = require('fs');

tape('Does server respond successfully?', function(t) {
    shot.inject(server.handler, {method: 'GET', url:'/'}, function(res) {
        t.equal(res.statusCode, 200, 'Server responds!');
        t.end();
    });
});

tape('Does the server read the index.html file', function(t){
    shot.inject(server.handler, {method: 'Get', url:'http://localhost:8000'}, function(res){
        t.notEqual(res.payload.indexOf("<!DOCTYPE html>"), -1, 'server returns html page');
        t.end();
    });
});

tape('Other file types can be returned successfully', function(t) {
    shot.inject(server.handler, {method: 'Get', url: 'http://localhost:8000/style.css'}, function(res) {
        fs.readFile(__dirname + '/../style.css', function(err, cssText) {
            t.equal(res.payload, cssText.toString(), 'server returns css page');
            t.end();
        });
    });
});

tape.onFinish(function(){
	server.server.close();
});
