var tape = require('wrapping-tape');
var redis = require('redis');
var redisFunctions = require('../src/redis.js');
var client, tests = {};

function listWriter(client, listName, someArray) {
    client.rpush(listName, someArray);
}

tests.module1 = tape({
	setup: function(t) {
        client = redisFunctions.client;
		client.select(3, function(){console.log('connected to db no. 3');});
		t.end();
	},
	teardown: function(t) {
        t.end();
	}
});

tests.module1('test can write list to db', function(t) {
    var someArray = ['1','2','3','4','5'];
    var listName = 'testList';
    listWriter(client, listName, someArray);
    client.lrange(listName, 0, -1, function(error, reply) {
        t.ok( ! error, 'assert error is empty' );
        t.deepEqual(someArray, reply, 'assert array is as expected');
        client.flushdb();
        t.end();
    });
});

tests.module1('test setData function', function(t){
    var username = 'rob';
	var message = 'Hello World!';
    var name = "name" + Date.now();
    name = name.substring(0,name.length-1);
    var msg = 'message' + Date.now();
    msg = msg.substring(0,msg.length-1);
	redisFunctions.setData('data', username, message);
    var expected = {};
    expected[name] = username;
    expected[msg] = message;
	redisFunctions.getData('data', function(output) {
        var reply = output;
		t.deepEqual(reply, expected, 'user has been added to db!');
		client.flushdb();
		t.end();
	});
});

// tests.module1('teardown', function(t) {
// 	redisFunctions.client.end();
// 	t.end();
// }); ------ This is to close the server when running just this file
