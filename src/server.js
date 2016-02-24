var http = require('http');
var port = 8000;
var fs = require('fs');
var server = http.createServer(handler);
var io = require('socket.io')(server);
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
}

server.listen(port);

console.log('Server is listening on http://localhost:' + port);

module.exports = {
    handler: handler,
    server: server,
    port: port,
    io: io
};

var socket = require('./socket.js');
