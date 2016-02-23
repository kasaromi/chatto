var http = require('http');
var port = 8000;
var fs = require('fs');

function handler(req, res){
    var url = req.url;
    if(url === '/'){
        fs.readFileSync(__dirname, '/index.html', function(error, index) {
            if (error) {
                console.log(error);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(index);
            }
        });
    }
}

var server = http.createServer(handler).listen(port);
console.log('Server is listening on http://localhost:' + port);
