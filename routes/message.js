import express from "express";
import authenticate from "../middleware/authenticate.js";
import messageController from "../controllers/message.controller.js";
const messageRoute = express.Router();

// this route had implemented into "/u/getMessage" route when message doesn't exist
messageRoute.post(
  "/u/createMessage",
  authenticate,
  messageController.createMessage
);

messageRoute.post("/u/getMessage", authenticate, messageController.getMessage);

// This route had already implemented in socket/io.js
messageRoute.post(
  "/u/sendMessage",
  authenticate,
  messageController.sendMessage
);

export default messageRoute;
