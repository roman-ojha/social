import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage, exitBrowser } from "../functions/browser.js";

await launchBrowser();
const [page, closePage] = await newPage();
const goToYoutubeHomePage = async () => {
  const url: string = "https://www.youtube.com/";
  try {
    if (page) {
      await page.goto(url, {
        waitUntil: "networkidle0",
      });
    }
  } catch (e) {
    // await exitBrowser();
  }
};
await goToYoutubeHomePage();
export default {
  youtubeHome: async (req: Request, res: Response) => {},
};
