// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

// Create server
var server = require('http').createServer(app);

// Create socket.io
var io = require('socket.io').listen(server);

// Create comments list
var comments = [];

// Create server
server.listen(3000);

// Create route
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Create socket.io
io.sockets.on('connection', function(socket) {
  // Send comments list
  socket.emit('load comments', comments);

  // Receive comments
  socket.on('send comment', function(data) {
    comments.push(data);
    io.sockets.emit('receive comment', data);
  });

  // Delete comments
  socket.on('delete comment', function(data) {
    comments = comments.filter(function(comment) {
      return comment.id !== data.id;
    });
    io.sockets.emit('receive delete comment', data);
  });
});