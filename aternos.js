const puppeteer = require("puppeteer");

async function startServer() {
  const browser = await puppeteer.launch({
    product: "firefox",   // 👈 IMPORTANT
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.goto("https://aternos.org/go/");

  console.log("Firefox ouvert sur Aternos");
}

module.exports = { startServer };