var socket = io();

//we can get things more easliy from the object with this function
// number is the message number, type can be: time, name and message and input is the inputted object
function format(number, type, input){
    if(type === 'time'){
        var dateMili = Object.keys(input)[(number - 1) * 2].split('name')[1] * 10;
        return dateMili;
    }
    else if(type === 'name'){
        x = Object.keys(input).map(function (key){
            return input[key];
        });
        return x[(number -1) * 2];
    }
    else if(type === 'message'){
        x = Object.keys(input).map(function (key){
            return input[key];
        });
        return x[(number -1) * 2 + 1];
    }
}

function print(unparsedData){
    var data = JSON.parse(unparsedData);
    var length = Object.keys(data).length/2;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i=1; i<=length; i++){
        var date = new Date(format(i, 'time', data));
        var day = date.getDate().toString();
        var month = months[date.getMonth()].toString();
        var hours = date.getHours() <= 9 ? "0" + date.getHours().toString() : date.getHours().toString();
        var mins = date.getMinutes() <= 9 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
        var concatedDate = day + " " + month + " - " + hours + ":" + mins;
        var name = format(i, 'name', data).replace(/["%20"]/g," ");
        var message = format(i, 'message', data).replace(/["%20"]/g," ");
        var total = concatedDate + " " + name + ": " + message;
        var node = document.createTextNode(total);
        var other = document.createElement('li');
        other.appendChild(node);
        document.getElementById('messageContainer').appendChild(other);
    }
}

document.getElementById('send').addEventListener('click', function(k) {
    k.preventDefault();
    sendUserAndMsg();
});

document.getElementById('mess').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) sendUserAndMsg();
});

function sendUserAndMsg(){
    var username = document.getElementById('username').value;
    var msg = document.getElementById('mess').value;
    socket.emit('chat message', username + ': ' + msg);
    sendMessage(username, msg);
    document.getElementById('mess').value='';
}

document.getElementById('login').addEventListener('click', function() {
    hideUserShowChat();
});

document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) hideUserShowChat();
});

function hideUserShowChat() {
    document.getElementById('user-container').classList.remove('show');
    document.getElementById('user-container').classList.add('hide');
    document.getElementById('window-container').classList.remove('hide');
    document.getElementById('window-container').classList.add('show');
    document.getElementById('mess').focus();
}

var scrollContainer = document.getElementById('messageContainer');
function autoScroll(container) {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

socket.addEventListener('chat message', function(msg){
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    var day = d.getDate();
    var month = months[d.getMonth()];
    var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var mins = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var time = hours + ':' + mins;
    var msgText = document.createTextNode(day + " " + month + " - " + time + " " + msg);
    var msgOnScreen = document.createElement('li');
    msgOnScreen.appendChild(msgText);
    document.getElementById('messageContainer').appendChild(msgOnScreen);
    autoScroll(scrollContainer);
});

// ------- ^^ Jasmine ^^ ------

var request = new XMLHttpRequest();

function sendMessage(name, message){
    request.open('post', '/msg' + name + ':' + message);
    request.send();
}

function loadData(){
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            var data = request.responseText;
            print(data);
        }
    };
    request.open('get', '/display');
    request.send();
}
loadData();
