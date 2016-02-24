var io = require('socket.io-client');
var tape = require('tape');
var server = require('../src/server.js');
var socket = require('../src/socket.js');
var redis = require('../src/redis.js');

var socketURL = "http://localhost:8000";

var options = {
    transports: ['websocket'],
    'force new connection': true
};

tape('socket should emit a connect event', function(t) {
    var client = io.connect('http://localhost:8000', options);
    client.on('connect', function() {
        t.ok(client.connected, 'client has connected');
        client.disconnect();
        t.end();
    });
});

tape('Should be able to broadcast messages', function(t) {
    var client1, client2, client3;
    var message = 'Hello World';
    var messages = 0;
    var socketURL = 'http://localhost:8000';

    var checkMessage = function(client) {
        console.log('gets here');
        client.on('chat message', function(msg) {
            console.log('here too?');
            t.equals(msg, message, 'message has been received by client ');
            client.disconnect();
            messages++;
            if (messages === 3) {
                t.end();
            }
        });
    };

    client1 = io.connect(socketURL, options);
    checkMessage(client1);

    client1.on('connect', function(data) {
        client2 = io.connect(socketURL, options);
        checkMessage(client2);

        client2.on('connect', function(data) {
            client3 = io.connect(socketURL, options);
            checkMessage(client3);

            client3.on('connect', function(data) {
                console.log('about to send message!');
                client2.emit('chat message', message);
            });
        });
    });
});

tape("teardown", function(t){
    server.server.close();
    redis.client.quit();
    t.end();
});
