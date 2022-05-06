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
    return browser;
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
