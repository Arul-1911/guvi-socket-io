const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // URL of your React app
   //  methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("A Magic bird is ready to deliver messages");

  socket.on("joinVillage", (village) => {
    socket.join(village);
    console.log(`A bird has joined the village: ${village}`);
  });

  socket.on("sendMessage", (message) => {
    io.to(message.village).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A bird has flown away!");
  });
});

server.listen(3000, () => {
  console.log("Birdhouse is already at port 3000");
});
