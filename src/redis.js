var redis = require('redis');
var client = redis.createClient();

function setData(x, y){
    client.hmset('data', 'name' + Date.now(), x, 'message' + Date.now(), y);
}

function getData(callback){
    client.hgetall('data', function(err, reply){
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
