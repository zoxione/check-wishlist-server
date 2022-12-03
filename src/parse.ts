let chrome: any = {};
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export const WebScraping = async (url: string) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  let browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  //await page.setUserAgent(userAgent.toString());

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `screenshots/gift.jpeg` });

  await browser.close();

  return page;
};
