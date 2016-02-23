var http = require('http');
var tape = require('tape');
var server = require('../server/server.js');
var shot = require('shot');

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

tape("teardown", function(t){
    server.server.close();
    t.end();
});
