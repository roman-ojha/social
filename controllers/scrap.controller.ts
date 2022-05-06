import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage } from "../functions/browser.js";

await launchBrowser();
const [page, closePage] = await newPage();

export default {
  youtubeHome: async (req: Request, res: Response) => {},
};
