import express from "express";
// import authenticate from "../middleware/auth/authenticate.js";
import authenticate from "../middleware/auth/authUsingRedis.js";
import postController from "../controllers/post.controller.js";
const postRoute = express.Router();

postRoute.post("/post/image-url", authenticate, postController.postImageUrl);

postRoute.post("/post/like", authenticate, postController.like);

postRoute.post("/post/comment", authenticate, postController.comment);

postRoute.post("/get/comment", postController.getComment);

postRoute.get("/get/posts", authenticate, postController.getUserPosts);

export default postRoute;
