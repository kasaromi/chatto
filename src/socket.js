var io = require('./server.js').io;

io.on('connection', function(socket){
    socket.on('chat message', function(data){
        io.emit('chat message', data);
    });
});
