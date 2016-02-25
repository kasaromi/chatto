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
	redisFunctions.setData('data', username, message);
	var expected = {name: 'rob', message: 'Hello World!'};
	redisFunctions.getData('data', function(reply) {
		t.deepEqual(reply, expected, 'user has been added to db!');
		client.flushdb();
		t.end();
	});
});

// tests.module1('teardown', function(t) {
// 	redisFunctions.client.end();
// 	t.end();
// });
