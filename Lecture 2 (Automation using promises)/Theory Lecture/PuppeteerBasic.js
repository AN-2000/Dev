const puppeteer = require("puppeteer");

let browser;
let page;
puppeteer
  .launch()
  .then(function (givenBrowser) {
    browser = givenBrowser;
    return browser.newPage();
  })
  .then(function (givenPage) {
    page = givenPage;
    return page.goto("https://www.google.com/");
  })
  .then(function () {
    return page.screenshot({ path: "ss.png" });
  })
  .then(function () {
    console.log("Done");
    browser.close();
  });
