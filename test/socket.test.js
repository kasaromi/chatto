var io = require('socket.io-client');
var tape = require('tape');
var server = require('../src/server.js');
var shot = require('shot');

var socketURL = "http://localhost:8000";

var options = {
    transports: ['websocket'],
    'force new connection': true
};

tape('sends the chat message with the name', function(t) {
    var client = io.connect(socketURL, options);
    var message = "Hey chika";
    client.on('message', function(msg) {
        t.equal(msg, "Hey chika", 'Sends the chat message');
        client.disconnect();
        t.end();
    });
});


server.server.close();
