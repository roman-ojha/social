import puppeteer from "puppeteer";

const args = [
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-accelerated-2d-canvas",
  "--disable-gpu",
  "--lang=en-US,en",
];
let browser: puppeteer.Browser;
const launchBrowser = async () => {
  try {
    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args,
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    console.log("Headless Browser launched Successfully");
    return true;
  } catch (err) {
    return false;
  }
};
const exitBrowser = async (): Promise<void> => {
  if (!browser) return;
  try {
    await browser.close();
  } catch (err) {}
};
const newPage = async (): Promise<
  [puppeteer.Page, () => {}] | [null, null]
> => {
  try {
    const page: puppeteer.Page = await browser.newPage();
    const closePage = async (): Promise<boolean> => {
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
