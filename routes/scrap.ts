import express from "express";
import scrapController from "../controllers/scrap.controller.js";
const scrapRoute = express.Router();

scrapRoute.get("/scrap/youtube/home", scrapController.youtubeHome);

export default scrapRoute;
