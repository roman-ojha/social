import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage } from "../functions/browser.js";
import ResponseObject from "interface/responseObject.js";

await launchBrowser();
const [homePage, closePage] = await newPage();
if (!homePage) {
  await launchBrowser();
}
const goToYoutubeHomePage = async () => {
  const url: string = "https://www.youtube.com/";
  try {
    if (homePage) {
      await homePage.goto(url, {
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
      if (!homePage) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error, Please try again later",
        });
      }
      await homePage.reload();
      // scroll down one time
      await homePage.evaluate(() => {
        document.scrollingElement?.scrollBy(0, 4000);
      });
      //   waiting for document to get load
      await homePage.waitForSelector("ytd-rich-grid-media");
      // // get videos
      // let link: string[] = [];
      const videos = await homePage.evaluate(() => {
        return Array.from(
          document.getElementsByClassName(
            "yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media"
          )
        ).map((el) => {
          const href = el.getAttribute("href");
          const title = el.getAttribute("title");
          if (href && title) {
            return {
              videoId: href.slice(9, href.length),
              title: title,
            };
          }
        });
      });
      if (videos.length > 0) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Successful",
          videos,
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

  youtubeSearch: async (req: Request, res: Response) => {
    return res.send("hello");
    // const [searchPage, closeSearchPage] = await newPage();
    // if (!searchPage) {
    //   await launchBrowser();
    // }
    // const url: string = "https://www.youtube.com/";
    // if (searchPage) {
    //   await searchPage.goto(url, {
    //     waitUntil: "networkidle0",
    //   });
    // }
    // try {
    //   if (!homePage) {
    //     return res.status(500).json(<ResponseObject>{
    //       success: false,
    //       msg: "Server Error, Please try again later",
    //     });
    //   }
    //   await homePage.reload();
    //   // scroll down one time
    //   await homePage.evaluate(() => {
    //     document.scrollingElement?.scrollBy(0, 4000);
    //   });
    //   //   waiting for document to get load
    //   await homePage.waitForSelector("ytd-rich-grid-media");
    //   // // get videos
    //   // let link: string[] = [];
    //   const videos = await homePage.evaluate(() => {
    //     return Array.from(
    //       document.getElementsByClassName(
    //         "yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media"
    //       )
    //     ).map((el) => {
    //       const href = el.getAttribute("href");
    //       const title = el.getAttribute("title");
    //       if (href && title) {
    //         return {
    //           videoId: href.slice(9, href.length),
    //           title: title,
    //         };
    //       }
    //     });
    //   });
    //   if (videos.length > 0) {
    //     return res.status(200).json(<ResponseObject>{
    //       success: true,
    //       msg: "Successful",
    //       videos,
    //     });
    //   } else {
    //     return res.status(404).json(<ResponseObject>{
    //       success: false,
    //       msg: "Can't be able to get Youtube data, Please try again later",
    //     });
    //   }
    // } catch (err) {
    //   return res.status(500).json(<ResponseObject>{
    //     success: false,
    //     msg: "Server Error, Please try again later",
    //   });
    // }
  },
};
