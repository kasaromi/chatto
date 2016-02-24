var redis = require('redis');
var client = redis.createClient();

function addData(input){
    client.set('data', input);
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
    addData: addData,
};

module.exports = {
    addData: addData
};
