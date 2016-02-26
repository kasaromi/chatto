var server = require('./server.js');
var io = require('socket.io')(server.server);

io.on('connection', function(socket){
    socket.on('chat message', function(data){
        io.emit('chat message', data);
    });
});

module.exports = {
    io: io
};
