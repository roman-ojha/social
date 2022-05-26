// import { __dev__, __prod__ } from "../constants/env.js";
// import puppeteer from "puppeteer";

// const args = [
//   "--disable-dev-shm-usage",
//   "--no-sandbox",
//   "--disable-setuid-sandbox",
//   "--disable-accelerated-2d-canvas",
//   "--disable-gpu",
//   "--lang=en-US,en",
//   "--window-size=1920,1080",
// ];
// let browser: puppeteer.Browser;
// const launchBrowser = async () => {
//   try {
//     browser = await puppeteer.launch({
//       headless: __prod__ ? true : __dev__ ? true : true,
//       devtools: false,
//       ignoreHTTPSErrors: true,
//       args,
//       ignoreDefaultArgs: ["--disable-extensions"],
//       defaultViewport: {
//         width: 1920,
//         height: 1080,
//       },
//     });
//     console.log("Headless Browser launched Successfully");
//     return true;
//   } catch (err) {
//     return false;
//   }
// };
// const exitBrowser = async (): Promise<void> => {
//   if (!browser) return;
//   try {
//     await browser.close();
//   } catch (err) {}
// };
// const newPage = async (): Promise<
//   [puppeteer.Page, () => {}] | [null, null]
// > => {
//   try {
//     const page: puppeteer.Page = await browser.newPage();
//     const closePage = async (): Promise<boolean> => {
//       if (!page) return false;
//       try {
//         await page.close();
//         return true;
//       } catch (e) {
//         return false;
//       }
//     };
//     return [page, closePage];
//   } catch (e) {
//     return [null, null];
//   }
// };

// const totalNumberOfTab = async () => {
//   return (await browser.pages()).length;
// };

// export default launchBrowser;
// export { newPage, exitBrowser, totalNumberOfTab };
