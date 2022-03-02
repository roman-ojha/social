import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { credentials: true, origin: process.env.CLIENT_BASE_URL },
});

io.on("connect", (socket) => {
  socket.on("send-message", (message) => {
    console.log(message);
  });
  socket.on("get-message", (userID) => {
    console.log(userID);
    console.log(socket.id);
  });
});

export default io;
export { httpServer, app };
