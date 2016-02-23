var tape = require('tape');
var server = require('../server/server.js');
var hyperquest = require('hyperquest');
var concat = require('concat-stream');
var hostUrl = 'http://localhost:8000/';

tape('#1 check if server is running', function(t) {
    hyperquest.get(hostUrl, function(error, response) {
        t.equal(response.statusCode, 200, "Assert server is running");
        t.end();
    });
});

// tape('#2 fetch the index.html', function(t) {
//     hyperquest.get(hostUrl, function(error, response) {
//         response.pipe(concat(function(payload){
//             t.ok(payload.toString('utf8').match('<!DOCTYPE html>'), 'check for DOCTYPE');
//             t.ok(payload.toString('utf8').match('<html>'), 'check for HTML tag');
//             t.end();
//         }));
//     });
// });
