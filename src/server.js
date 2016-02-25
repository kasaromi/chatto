var http = require('http');
var port = 8000;
var fs = require('fs');
var env2 = require('env2')('../config.env');
var redisFunctions = require('./redis.js');

function handler(req, res){
    var url = req.url;
    console.log(url);
    if(url === '/'){
        fs.readFile(__dirname + '/../index.html', function(error, index) {
            if (error) {
                console.log(error);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(index);
            }
        });
    }
    else if(url.indexOf('.')>-1){
        var file = url;
        var ext = url.split('.')[1];
        fs.readFile(__dirname + '/../' + url, function(error, file) {
            if (error) {
                console.log(error);
            } else {
                res.writeHead(200, {'Content-Type': 'text/' + ext});
                res.end(file);
            }
        });
    }
    else if(url.match('/msg')){
        var x = url.split('/msg')[1].split(':');
        var name = x[0];
        var message = x[1];
        redisFunctions.setData('data', name, message);
    }
    else if(url.match('/display')){
        redisFunctions.getData('data', function(reply){
            var data = JSON.stringify(reply);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
}

var server = http.createServer(handler).listen(port);

console.log('Server is listening on http://localhost:' + port);

module.exports = {
    handler: handler,
    server: server
};

var socket = require('./socket.js');
