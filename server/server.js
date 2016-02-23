var http = require('http');
var port = 8000;
var fs = require('fs');
var redisFunctions = require('./redis.js');

function handler(req, res){
    var url = req.url;
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
    else if( url.indexOf(':')>-1){
        var total = url.split('/')[1].split(':');
        var room = total[0];
        var user = total[1];
        var message = total[2];
        redisFunctions.addToDB(room, user, message);
    }
}

var server = http.createServer(handler).listen(port);
console.log('Server is listening on http://localhost:' + port);

module.exports = {
    handler: handler,
    server: server
};
