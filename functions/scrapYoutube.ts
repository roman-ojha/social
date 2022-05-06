import launchBrowser from "./browser.js";
import { newPage, exitBrowser } from "./browser.js";

const scrapeYoutube = async () => {
  const [page, closePage] = await newPage();
  if (!page) return;

  const url: string = "https://www.youtube.com/";
  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
  } catch (e) {
    return;
  }
};
