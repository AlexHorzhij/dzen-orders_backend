const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

server.listen(5000, () => console.log(`Server started on 5000`));

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.on("connection", (socket) => {
  const count = io.engine.clientsCount;
  io.emit("message", { text: count });

  socket.on("disconnect", (a) => {
    const count = io.engine.clientsCount;
    socket.broadcast.emit("message", { text: count - 1 });
  });

  socket.on("manual-disconnect", () => {
    const count = io.engine.clientsCount;
    socket.broadcast.emit("message", { text: count - 1 });
  });
});
