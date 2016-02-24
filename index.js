var socket = io();

document.getElementById('send').addEventListener('click', function(k){
    var username = document.getElementById('username').value;
    var msg = document.getElementById('mess').value;
    k.preventDefault();
    socket.emit('chat message', username + ': ' + msg);
    document.getElementById('mess').value='';
});

socket.addEventListener('chat message', function(msg){
    var msgText = document.createTextNode(msg);
    var msgOnScreen = document.createElement('li');
    msgOnScreen.appendChild(msgText);
    document.getElementById('messageContainer').appendChild(msgOnScreen);
});
