import express from "express";
import authenticate from "../middleware/authenticate.js";
import postController from "../controllers/post.controller.js";
const postRoute = express.Router();

postRoute.post("/post/like", authenticate, postController.like);

postRoute.post("/post/comment", authenticate, postController.comment);

postRoute.post("/get/comment", postController.getComment);

postRoute.get("/get/posts", postController.getUserPosts);

export default postRoute;
