var http = require('http');
var port = 8000;
var fs = require('fs');
var server = http.createServer(handler).listen(port);
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

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        redisFunctions.addData(msg);
    });
});

console.log('Server is listening on http://localhost:' + port);

module.exports = {
    handler: handler,
    server: server
};