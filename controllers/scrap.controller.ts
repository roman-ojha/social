import { Request, Response } from "express";
import launchBrowser from "../functions/browser.js";
import { newPage, totalNumberOfTab } from "../functions/browser.js";
import ResponseObject from "interface/responseObject.js";
import PQueue from "p-queue";

await launchBrowser();
export default {
  youtubeHome: async (req: Request, res: Response) => {
    try {
      const maxTab = 50;
      const queueRequest = async () => {
        if ((await totalNumberOfTab()) > maxTab) {
          // we will be in queue until total number of tab is lesser then maxTab
          setTimeout(queueRequest, 100);
        } else {
          // number of tab is less then 50
          let totalTab = await totalNumberOfTab();
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
        }
      };
      queueRequest();
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please try again later",
      });
    }
  },

  youtubeSearch: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please fill the search field",
        });
      }
      const maxTab = 50;
      const queueRequest = async () => {
        if ((await totalNumberOfTab()) > maxTab) {
          setTimeout(queueRequest, 100);
        } else {
          const [searchPage, closeSearchPage] = await newPage();
          if (!searchPage) {
            return res.status(500).json(<ResponseObject>{
              success: false,
              msg: "Server Error, Please try again later",
            });
          }
          const url: string = `https://www.youtube.com/results?search_query=${q}`;
          await searchPage.goto(url, {
            waitUntil: "networkidle0",
          });
          await searchPage.waitForSelector("ytd-video-renderer");
          const videos = await searchPage.evaluate(() => {
            return Array.from(
              document.getElementsByClassName(
                "yt-simple-endpoint style-scope ytd-video-renderer"
              )
            ).map((el) => {
              const href = el.getAttribute("href");
              const title = el.getAttribute("title");
              if (href && title) {
                return {
                  videoId: href.slice(9, href.length),
                  title: el.getAttribute("title"),
                };
              }
            });
          });
          closeSearchPage();
          if (videos.length > 0) {
            return res.status(200).json(<ResponseObject>{
              success: true,
              msg: "Successful",
              videos,
            });
          } else {
            closeSearchPage();
            return res.status(404).json(<ResponseObject>{
              success: false,
              msg: "Can't be able to get Youtube data, Please try again later",
            });
          }
        }
      };
      queueRequest();
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please try again later",
      });
    }
  },
};
