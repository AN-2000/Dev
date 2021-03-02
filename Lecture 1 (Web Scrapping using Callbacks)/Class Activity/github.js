const request = require("request");
const cheerio = require("cheerio");
let { jsPDF } = require("jspdf");
const fs = require("fs");

let $;
let data = {};

request("https://github.com/topics", function (err, res, body) {
  $ = cheerio.load(body);
  let topThreeTopics = $(
    ".no-underline.d-flex.flex-column.flex-justify-center"
  );

  for (let i = 0; i < 3; i++) {
    topicLinkGenerator($(topThreeTopics[i]).attr("href"), getTopicPage);
  }
});

function topicLinkGenerator(subLink, callback) {
  callback("https://github.com" + subLink);
}

function getTopicPage(url) {
  request(url, function (err, res, body) {
    let urlArray = url.split("/");
    let topicName = urlArray[urlArray.length - 1];
    findProjects(topicName, body, findIssues);
  });
}

function findProjects(folderName, body, callback) {
  fs.mkdirSync(folderName);
  fs.mkdirSync(folderName + "/PDF");
  if (!body) {
    return;
  } else {
    $ = cheerio.load(body);
  }
  let allProjects = $(".d-flex.flex-justify-between.my-3 h1 ");
  if (allProjects.length > 8) {
    allProjects = allProjects.slice(0, 8);
  }
  for (let i = 0; i < allProjects.length; i++) {
    callback(
      "https://github.com" +
        $($(allProjects[i]).find("a")[1]).attr("href") +
        "/issues",
      folderName,
      issueProcessor,
      $($(allProjects[i]).find("a")[1]).text()
    );
  }
}

function findIssues(url, folderName, callback, projectName) {
  request(url, (err, res, body) => {
    if (!body) {
      return;
    } else {
      $ = cheerio.load(body);
    }
    let allIssues = $(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open"
    );
    if (allIssues.length <= 0) {
      callback(folderName, null, null);
    } else {
      for (let i = 0; i < allIssues.length; i++) {
        callback(
          folderName,
          $(allIssues[i]).text(),
          "https://github.com" + $(allIssues[i]).attr("href"),
          projectName
        );
      }
    }
  });
}

function issueProcessor(topic, issue, issueUrl, projectName) {
  if (projectName) projectName = projectName.trim();

  if (issue) {
    let pdfPath = `./${topic}/PDF/${projectName}.pdf`;
    if (!data[topic]) {
      data[topic] = [
        { projectName: projectName, issues: [{ issue, url: issueUrl }] },
      ];

      pdfGenerator(pdfPath, projectName, topic);
    } else {
      let requiredProjectIndex = data[topic].findIndex(
        (p) => p.projectName === projectName
      );

      if (requiredProjectIndex !== -1) {
        data[topic][requiredProjectIndex].issues.push({ issue, url: issueUrl });
        pdfGenerator(pdfPath, projectName, topic);
      } else {
        data[topic].push({
          projectName: projectName,
          issues: [{ issue, url: issueUrl }],
        });
        pdfGenerator(pdfPath, projectName, topic);
      }
    }
  }
}

function pdfGenerator(path, projectName, topic) {
  let doc = new jsPDF();
  let requiredIssues = data[topic].find((p) => p.projectName === projectName)
    .issues;
  requiredIssues.forEach(function (issue, i) {
    doc.text(5, 15 + i * 15, "issue: " + issue.issue + "\nURL: " + issue.url);
  });
  doc.save(path);
}
