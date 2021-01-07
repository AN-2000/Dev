let puppeteer = require("puppeteer");
let sentiment = require("sentiment");
let s = new sentiment();
let creds = require("./creds.json");
(async function () {
  let currNoOfAns = 0;
  let returnedAnsLen = 0;
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 50,
  });
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto("https://www.quora.com/");

  await page.type("[placeholder='Email']", creds.email);
  await page.type("[placeholder='Password']", creds.password);
  await page.waitForSelector(".submit_button.ignore_interaction");
  await Promise.all([
    page.waitForNavigation(),
    page.click(".submit_button.ignore_interaction"),
  ]);
  await page.waitForSelector("input[type=text]");
  await page.type("input[type=text]", process.argv[2]);
  await page.waitForSelector(
    ".q-click-wrapper.qu-display--block.qu-tapHighlight--white.qu-cursor--pointer    .q-box.qu-py--small.qu-px--medium.qu-borderBottom.qu-tapHighlight--none.qu-display--flex.qu-alignItems--center"
  );

  await Promise.all([
    page.waitForNavigation(),
    page.evaluate(() => {
      document
        .querySelectorAll(
          ".q-click-wrapper.qu-display--block.qu-tapHighlight--white.qu-cursor--pointer    .q-box.qu-py--small.qu-px--medium.qu-borderBottom.qu-tapHighlight--none.qu-display--flex.qu-alignItems--center"
        )[1]
        .click();
    }),
  ]);

  await page.waitForSelector(".q-box.qu-userSelect--text");

  let tArr = await page.$x(
    '//div[@class="q-relative spacing_log_answer_content puppeteer_test_answer_content"]'
  );

  returnedAnsLen = tArr.length;
  await page.evaluate((tEl) => {
    tEl.scrollIntoView();
  }, tArr[tArr.length - 1]);
  await waitTillHTMLRendered(page);
  while (returnedAnsLen > currNoOfAns) {
    currNoOfAns = returnedAnsLen;
    tArr = await page.$x(
      '//div[@class="q-relative spacing_log_answer_content puppeteer_test_answer_content"]'
    );
    returnedAnsLen = tArr.length;

    await page.evaluate((tEl) => {
      tEl.scrollIntoView();
    }, tArr[tArr.length - 1]);
    await waitTillHTMLRendered(page);
  }

  let allReadMore = await page.$x(
    "//span[@class='q-text qu-cursor--pointer qt_read_more qu-color--blue_dark qu-fontFamily--sans qu-hover--textDecoration--underline']"
  );

  await page.evaluate((...readMores) => {
    for (let i = 0; i < readMores.length; i++) {
      readMores[i].click();
    }
  }, ...allReadMore);

  tArr = await page.$x(
    '//div[@class="q-relative spacing_log_answer_content puppeteer_test_answer_content"]'
  );
  let answers = await page.evaluate((...AllAnswers) => {
    let s = "";
    for (let i = 0; i < AllAnswers.length; i++) {
      s += AllAnswers[i].innerText;
      s += "\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
    }
    return s;
  }, ...tArr);

  await browser.close();
  console.log("Sentiment score:");
  let score = s.analyze(answers).comparative;
  console.log(score);
  console.log(
    "Scale(-5 to +5) -5 being extremely sad and +5 being extremely happy "
  );
})();

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(
      () => document.body.innerHTML.length
    );
    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0;

    if (countStableSizeIterations >= minStableSizeIterations) {
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};
