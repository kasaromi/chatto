var socket = io();

// ^^ socket stuff ^^

// ------ for Jasmine -------

//we can get things more easliy from the object with this function
// number is the message number, type can be: time, name and message and input is the inputted object
function format(number, type, input){
    if(type === 'time'){
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        date = new Date(Object.keys(input)[(number - 1) * 2].split('name')[1] * 1000);
        return [date.getDate(), months[date.getMonth()], date.getHours(), date.getMinutes()];
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
