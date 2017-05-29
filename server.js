var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var user

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  user = Date.now();

  socket.on('message.sent', function(message){
    io.emit('message', user + ': ' + message);
  });

  io.emit('message', 'User ' + user + ' has connected');


  socket.on('disconnect', function () {
    io.emit('message',user + ' has disconnected');
  });
});




http.listen(process.env.PORT || 3000, function() {
  console.log("Started server");
});
