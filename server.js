// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('A user connected');
  socket.broadcast.emit('message', 'A new user has joined the chat');

  socket.on('chat message', msg => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
