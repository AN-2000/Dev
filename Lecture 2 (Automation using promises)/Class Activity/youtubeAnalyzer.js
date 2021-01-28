#!/usr/bin/env node
process.removeAllListeners("warning");
const puppeteer = require("puppeteer");

let page;
let noOfVideos = 0;
let currPlaylistLength = 0;
let runningBrowser;

puppeteer
  .launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  })
  .then((browser) => {
    runningBrowser = browser;
    return browser.pages();
  })
  .then((Pages) => {
    page = Pages[0];
    return page.goto(process.argv[2]);
  })
  .then(() => {
    return page.waitForSelector(
      ".style-scope.ytd-playlist-sidebar-primary-info-renderer span"
    );
  })
  .then(() => {
    return page.evaluate(() => {
      let n = document.querySelectorAll(
        ".style-scope.ytd-playlist-sidebar-primary-info-renderer span"
      )[0].innerHTML;
      n = n.split(",");
      if (n.length === 1) return n[0];
      else return n.join("");
    });
  })
  .then((number) => {
    noOfVideos = number;
  })
  .then(() => {
    (function loop(i) {
      if (i <= noOfVideos / 100)
        new Promise((resolve, reject) => {
          scrollDown(page)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        }).then((_) => loop(i + 1));
    })(0);
    return;
  })
  .then(() => {
    return waitTillHTMLRendered(page);
  })
  .then(() => {
    return page.evaluate(() => {
      function hmsToSecondsOnly(str) {
        var p = str.split(":"),
          s = 0,
          m = 1;

        while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
        }

        return s;
      }

      let videosArr = document.querySelectorAll(
        "span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
      );
      console.log(videosArr);
      let totalTime = 0;
      for (let i = 0; i < videosArr.length; i++) {
        totalTime += hmsToSecondsOnly(videosArr[i].innerText.trim());
      }
      totalTime = totalTime / 3600;
      console.log(totalTime, videosArr.length);
      return totalTime;
    });
  })
  .then((tt) => {
    console.log(tt);
  })
  .then(() => {
    return runningBrowser.close();
  })
  .catch((err) => {
    console.log(err);
  });

function waitForScroll(page) {
  return new Promise(function (resolve, reject) {
    page
      .waitForFunction(
        'document.querySelectorAll(".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer").length > ' +
          currPlaylistLength
      )
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function scrollToCurrEnd(page) {
  return new Promise(function (resolve, reject) {
    page
      .evaluate(() => {
        let initialLast = document.querySelectorAll(
          ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer"
        );

        initialLast[initialLast.length - 1].scrollIntoView(true);
        return initialLast.length;
      })
      .then((len) => {
        resolve(len);
      })
      .catch(() => {
        reject();
      });
  });
}

function scrollDown(page) {
  return new Promise(function (resolve, reject) {
    scrollToCurrEnd(page)
      .then((len) => {
        currPlaylistLength = len;
        if ((noOfVideos - currPlaylistLength) / 100 !== 0)
          return waitForScroll(page);
        else return true;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//Polyfill of wait till network idle 0
//Will just be given in promise lecture to be used
//Explained in async-await lecture
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
