var socket = io();

document.getElementById('send').addEventListener('click', function(k){
    var username = document.getElementById('username').value;
    var msg = document.getElementById('mess').value;
    k.preventDefault();
    socket.emit('chat message', username + ': ' + msg);
    sendMessage(username, msg);
    document.getElementById('mess').value='';
});

socket.addEventListener('chat message', function(msg){
    var msgText = document.createTextNode(msg);
    var msgOnScreen = document.createElement('li');
    msgOnScreen.appendChild(msgText);
    document.getElementById('messageContainer').appendChild(msgOnScreen);
});


var request = new XMLHttpRequest();

function sendMessage(name, message){
    request.open('post', '/msg' + name + ':' + message);
    request.send();
}

function loadData(){
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            var data = request.responseText;
            var node = document.createTextNode(data);
            var other = document.createElement('div');
            other.appendChild(node);
            document.getElementById('messageContainer').appendChild(other);
        }
    };
    request.open('get', '/display');
    request.send();
}
loadData();
