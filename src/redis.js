var redis = require('redis');
var client = redis.createClient();

function setData(cli, x, y){
    client.hmset(cli, 'name' /*+ Date.now()*/, x, 'message' /*+ Date.now()*/, y);
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
