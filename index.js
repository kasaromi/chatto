var socket = io();

// document.getElementsByTagName('form')[0].addEventListener('submit', function(k){
//     k.preventDefault();
//     socket.emit('chat message', document.getElementById('m').value);
//     document.getElementById('m').value='';
// });

var username = document.getElementById('username').value;
var msg = document.getElementById('mess').value;

document.getElementById('mess').addEventListener('submit', function(k){
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

document.getElementById('button').addEventListener('click', function () {
    document.getElementById("message");
});
