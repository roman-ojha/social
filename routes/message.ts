import express from "express";
// import authenticate from "../middleware/auth/authenticate.js";
import authenticate from "../middleware/auth/authUsingRedis.js";
import messageController from "../controllers/message.controller.js";
const messageRoute = express.Router();

// this route had implemented into "/u/getMessage" route when message doesn't exist
// messageRoute.post(
//   "/u/createMessage",
//   authenticate,
//   messageController.createMessage
// );

messageRoute.post(
  "/u/getMessage",
  authenticate,
  messageController.getSingleUserMessage
);

messageRoute.get(
  "/u/getRootUserMessages",
  authenticate,
  messageController.getRootUserMessages
);

// This route had already implemented in socket/io.js
messageRoute.post(
  "/u/sendMessage",
  authenticate,
  messageController.sendMessage
);

export default messageRoute;
