import { Server } from "socket.io";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`starting on ${PORT}`);
});
