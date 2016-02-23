var socket = io();
document.getElementsByTagName('form')[0].addEventListener('submit', function(k){
    k.preventDefault();
    socket.emit('chat message', document.getElementById('m').value);
    document.getElementById('m').value='';
});
socket.addEventListener('chat message', function(msg){
    var noder = document.createTextNode(msg);
    var node = document.createElement('li');
    node.appendChild(noder);
    document.getElementById('messages').appendChild(node);
});
