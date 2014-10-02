var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
Tail = require('tail').Tail;

tail = new Tail("/Users/ican/Dropbox/Projects/Tailer/testlog.log");
tail.watch()

app.get('/', function(req, res){
  res.sendfile('index.html');
});

tail.on("line", function(data,extra) {
  io.emit('newline', data);
});

tail.on("error", function(error) {
  console.log('ERROR: ', error);
  io.emit('newline', "Error:" + error);
});

app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'), function(){
  console.log('listening on *: ' + app.get('port'));
});

