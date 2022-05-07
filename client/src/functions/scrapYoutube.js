import { toastError } from "../services/toast";
import launchBrowser from "./browser";
import { newPage } from "./browser";

await launchBrowser();
const [page, closePage] = await newPage();
if (!page) {
  await launchBrowser();
}
const goToYoutubeHomePage = async () => {
  const url = "https://www.youtube.com/";
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
  youtubeHome: async () => {
    try {
      if (!page) {
        return;
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
      const videoId = await page.evaluate(() => {
        return Array.from(
          document.getElementsByClassName(
            "yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media"
          )
        ).map((el) => {
          const href = el.getAttribute("href");
          if (href) {
            return href.slice(9, href.length);
          }
        });
      });
      if (videoId.length > 0) {
        return { videoId };
      } else {
        return null;
      }
    } catch (err) {
      return toastError("Something went wrong please try again later");
    }
  },
};
