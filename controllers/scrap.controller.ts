import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage, totalNumberOfTab } from "../functions/browser.js";
import ResponseObject from "interface/responseObject.js";

await launchBrowser();

export default {
  youtubeHome: async (req: Request, res: Response) => {
    try {
      const totalTab = await totalNumberOfTab();
      if (totalTab > 50) {
        res.status(202).json(<ResponseObject>{
          success: true,
          msg: "Your request is in queue please wait for a while",
        });
      }
      const [homePage, closePage] = await newPage();
      if (!homePage) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error, Please try again later",
        });
      }
      const url: string = "https://www.youtube.com/";
      await homePage.goto(url, {
        waitUntil: "networkidle0",
      });
      // await homePage.reload();
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
      closePage();
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

  // youtubeSearch: async (req: Request, res: Response) => {
  //   try {
  //     const { q } = req.query;
  //     if (!q) {
  //       return res.status(400).json(<ResponseObject>{
  //         success: false,
  //         msg: "Please fill the search field",
  //       });
  //     }
  //     const [searchPage, closeSearchPage] = await newPage();
  //     const url: string = `https://www.youtube.com/results?search_query=${q}`;
  //     if (searchPage) {
  //       await searchPage.goto(url, {
  //         waitUntil: "networkidle0",
  //       });
  //     }
  //     if (!searchPage || !closeSearchPage) {
  //       return res.status(500).json(<ResponseObject>{
  //         success: false,
  //         msg: "Server Error, Please try again later",
  //       });
  //     }
  //     //   waiting for document to get load
  //     await searchPage.waitForSelector("ytd-rich-grid-media");
  //     const videos = await searchPage.evaluate(() => {
  //       return Array.from(
  //         document.querySelectorAll("ytd-video-renderer a#video-title")
  //       ).map((el) => {
  //         const href = el.getAttribute("href");
  //         const title = el.getAttribute("title");
  //         if (href && title) {
  //           return {
  //             videoId: href.slice(9, href.length),
  //             title: el.getAttribute("title"),
  //           };
  //         }
  //       });
  //     });
  //     if (videos.length > 0) {
  //       await closeSearchPage();
  //       return res.status(200).json(<ResponseObject>{
  //         success: true,
  //         msg: "Successful",
  //         videos,
  //       });
  //     } else {
  //       await closeSearchPage();
  //       return res.status(404).json(<ResponseObject>{
  //         success: false,
  //         msg: "Can't be able to get Youtube data, Please try again later",
  //       });
  //     }
  //   } catch (err) {
  //     return res.status(500).json(<ResponseObject>{
  //       success: false,
  //       msg: "Server Error, Please try again later",
  //     });
  //   }
  // },
};
