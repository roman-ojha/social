import puppeteer from "puppeteer";

const args = [
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-accelerated-2d-canvas",
  "--disable-gpu",
  "--lang=en-US,en",
  "--window-size=1920,1080",
];
const launchBrowser = async () => {
  try {
    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args,
      ignoreDefaultArgs: ["--disable-extensions"],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    console.log("Headless Browser launched Successfully");
    return true;
  } catch (err) {
    return false;
  }
};
const exitBrowser = async () => {
  if (!browser) return;
  try {
    await browser.close();
  } catch (err) {}
};
const newPage = async () => {
  try {
    const page = await browser.newPage();
    const closePage = async () => {
      if (!page) return false;
      try {
        await page.close();
        return true;
      } catch (e) {
        return false;
      }
    };
    return [page, closePage];
  } catch (e) {
    return [null, null];
  }
};

export default launchBrowser;
export { newPage, exitBrowser };
