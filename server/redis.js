var redis = require('redis');
var client = redis.createClient();

function addToDB(room, user, message){
    client.HMSET('data', room, )
}
