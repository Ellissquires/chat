var app = require('express')();
var http = require('http').Server(app);
app.set('port', 5000);

var io = require('socket.io')(http);



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  var user = Date.now();

  socket.on('message.sent', function(message){
    io.emit('message', user + ': ' + message);
  });
  io.emit('message', 'User ' + user + ' has connected');
});

http.listen(3000, function() {
  console.log("Started server");
});
