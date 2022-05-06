import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage, exitBrowser } from "../functions/browser.js";
import { convert } from "html-to-text";
import ResponseObject from "interface/responseObject.js";

await launchBrowser();
const [page, closePage] = await newPage();
if (!page) {
  await launchBrowser();
}
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
  youtubeHome: async (req: Request, res: Response) => {
    try {
      if (!page) {
        return res
          .status(500)
          .json(<ResponseObject>{
            success: false,
            msg: "Server Error, Please try again later",
          });
      }
      await page.reload();
      // scroll down one time
      await page.evaluate(() => {
        document.scrollingElement?.scrollBy(0, 4000);
      });
      //   waiting for document to get load
      await page.waitForSelector("ytd-rich-grid-media");
      // // get videos
      // let link: string[] = [];
      const link = await page.evaluate(() => {
        return Array.from(
          document.getElementsByClassName(
            "yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media"
          )
        ).map((el) => "https://www.youtube.com" + el.getAttribute("href"));
      });
      if (link.length > 0) {
        return res.send(<ResponseObject>{
          success: true,
          msg: "Successful",
          data: {
            link,
          },
        });
      } else {
        return res.status(404).json(<ResponseObject>{
          success: false,
          msg: "Can't be able to get Youtube data, Please try again later",
        });
      }
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please try again later",
      });
    }
  },
};
