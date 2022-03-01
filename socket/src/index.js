import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors({ origin: process.env.CLIENT_BASE_URL }));
io.on("connection", (socket) => {
  console.log(`connected with id:${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`starting on ${PORT}`);
});
