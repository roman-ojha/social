import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { credentials: true, origin: process.env.CLIENT_BASE_URL },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

export default io;
export { httpServer, app };
