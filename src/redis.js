var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

function setData(cli, x, y){
    var name = 'name' + Date.now();
    name = name.substring(0,name.length-1);
    var message = 'message' + Date.now();
    message = message.substring(0,message.length-1);
    client.hmset(cli, name, x, message, y);
}

function getData(cli, callback){
    client.hgetall(cli, function(err, reply){
        if(err){
            console.log(err);
        }
        else{callback(reply);}
    });
}

module.exports = {
    getData: getData,
    setData : setData,
    client : client
};
