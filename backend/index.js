const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//socker io connection

io.on('connection', (socket) => {
   console.log('A magic bird is ready to deliver message');

   socket.on('joinVillage', (village) => {
      socket.join(village);
      console.log(`A bird has joined the village: ${village}`)
   });

   socket.on('sendMessage', (message) => {
      io.to(message.village).emit('recieveMessage', message)
   });

   socket.on('disconnect', () => {
      console.log('A bird has flown away');
   });

});


//server listening
server.listen(5000,() => {
   console.log('server listening')
})