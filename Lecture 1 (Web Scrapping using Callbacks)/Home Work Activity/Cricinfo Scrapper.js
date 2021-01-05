// 1. The activity is supposed to collect information of IPL from cricinfo and present in form of excel and pdf
// 2. All matches will be scanned
// 3. In excel we will have different sheets for different teams
// 4. For a team, we will calculate runs scored, balls used and number of not outs for each batsman through the entire IPL
// 5. Once the excel is ready, we will create pdf for each batsman inside the directory for a team

// Modules used - request for getting data, jsdom for data manipulation, one for excel manipulation and one for pdf generation
var request = require("request");
var jsdom = require("jsdom");
var ExcelJS = require('exceljs');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var imgDownloader = require('image-downloader');
var teams = {
};



function generatePDFs() {
    var teamNames = Object.getOwnPropertyNames(teams);
    for (var i = 0; i < teamNames.length; i++) {
        var playerNames = Object.getOwnPropertyNames(teams[teamNames[i]]);
        for (var j = 0; j < playerNames.length; j++) {
            var player = teams[teamNames[i]][playerNames[j]];
            var doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('./data/' + teamNames[i] + '/' + playerNames[j] + ".pdf"));
            doc.image('./data/' + teamNames[i] + '/' + playerNames[j] + ".jpg", {
                fit: [300, 300],
                align: 'center',
                valign: 'center'
            });
            doc.fontSize(25).text(playerNames[j], 150, 50);

            doc.fontSize(16).text('Runs', 400, 100);
            doc.fontSize(16).text(player.runs, 500, 100);

            doc.fontSize(16).text('Balls', 400, 125);
            doc.fontSize(16).text(player.balls, 500, 125);

            doc.fontSize(16).text('Innings', 400, 150);
            doc.fontSize(16).text(player.innings, 500, 150);

            doc.fontSize(16).text('Not Outs', 400, 175);
            doc.fontSize(16).text(player.innings - player.outs, 500, 175);

            doc.fontSize(16).text('Average', 400, 200);
            doc.fontSize(16).text(player.average, 500, 200);


            doc.end();
        }
    }
}

function handleImageDownloads() {
    handleImageDownloads.imageDownloadCounter++;
    if (handleImageDownloads.imageDownloadCounter == handleImageDownloads.totalPlayers) {
        generatePDFs();
    }
}

function downloadImages() {
    var teamNames = Object.getOwnPropertyNames(teams);
    handleImageDownloads.totalPlayers = 0;
    handleImageDownloads.imageDownloadCounter = 0;
    for (var i = 0; i < teamNames.length; i++) {
        var playerNames = Object.getOwnPropertyNames(teams[teamNames[i]]);
        handleImageDownloads.totalPlayers += playerNames.length;
        for (var j = 0; j < playerNames.length; j++) {
            var player = teams[teamNames[i]][playerNames[j]];
            // console.log(player);
            var stream = request({
                url: player.imageUrl,
                followAllRedirects: true
            }).pipe(fs.createWriteStream('./data/' + teamNames[i] + '/' + playerNames[j] + ".jpg"))
            stream.on('close', handleImageDownloads);
        }
    }

}

function handlePlayerPages(err, response, body) {
    var dom = new jsdom.JSDOM(body);
    var window = dom.window;
    var document = window.document;
    var img = document.querySelector('img');
    var player = this;

    player.imageUrl = img.getAttribute('src');
    console.log(player.imageUrl);
    handlePlayerPages.imageUrlSetCounter++;
    if (handlePlayerPages.imageUrlSetCounter == handlePlayerPages.totalPlayers) {
        downloadImages();
    }
}

function getImageUrls() {
    var teamNames = Object.getOwnPropertyNames(teams);
    handlePlayerPages.totalPlayers = 0;
    handlePlayerPages.imageUrlSetCounter = 0;
    for (var i = 0; i < teamNames.length; i++) {
        if (!fs.existsSync('./data/' + teamNames[i])) {
            fs.mkdirSync('./data/' + teamNames[i]);
        }

        var playerNames = Object.getOwnPropertyNames(teams[teamNames[i]]);
        handlePlayerPages.totalPlayers += playerNames.length;
        for (var j = 0; j < playerNames.length; j++) {
            var player = teams[teamNames[i]][playerNames[j]];
            request(player.url, handlePlayerPages.bind(player));
        }
    }
}

function generateExcel() {
    console.log(teams);
    const workbook = new ExcelJS.Workbook();
    var teamNames = Object.getOwnPropertyNames(teams);
    for (var i = 0; i < teamNames.length; i++) {
        console.log(teamNames[i]);
        var worksheet = workbook.addWorksheet(teamNames[i]);
        worksheet.addRow(["Name", "Runs", "Balls", "Innings", "Not Outs", "Average"]);
        worksheet.columns = [
            { header: 'Name', key: 'Name', width: 20 },
            { header: 'Runs', key: 'Runs', width: 10 },
            { header: 'Balls', key: 'Balls', width: 10 },
            { header: 'Innings', key: 'Innings', width: 10 },
            { header: 'Not Outs', key: 'Not Outs', width: 10 },
            { header: 'Average', key: 'Average', width: 10 },
        ];

        var playerNames = Object.getOwnPropertyNames(teams[teamNames[i]]);
        for (var j = 0; j < playerNames.length; j++) {
            var player = teams[teamNames[i]][playerNames[j]];
            var average = player.outs != 0 ? player.runs * 1.0 / player.outs : 10000;
            player.average = Math.round(average * 100) / 100;
            var row = [playerNames[j], player.runs, player.balls, player.innings, player.innings - player.outs, player.average];
            worksheet.addRow(row);
        }
    }

    var excelPromise = workbook.xlsx.writeFile('./data/ipl.xlsx');
    excelPromise.then(getImageUrls);
}

function handleKeeper(name) {
    return name.replace(" †", "").replace(" †", "");
}

function handleCaptain(name) {
    return name.replace(" (c)", "");
}

function addTeamToData(teamName) {
    if (!teams.hasOwnProperty(teamName)) {
        teams[teamName] = {
        };
    }
}

function addPlayerToTeam(name, url, runs, balls, out, teamName) {
    if (!teams[teamName].hasOwnProperty(name)) {
        teams[teamName][name] = {
            runs: runs,
            url: url,
            balls: balls,
            innings: 1,
            outs: out ? 1 : 0
        }
    } else {
        teams[teamName][name].runs += runs;
        teams[teamName][name].balls += balls;
        teams[teamName][name].innings++;
        teams[teamName][name].outs = out ? teams[teamName][name].outs + 1 : teams[teamName][name].outs;
    }
}

function handleTeam(teamScorecard, teamName) {
    console.log("##" + teamName + "##");
    addTeamToData(teamName);

    var teamRows = teamScorecard.querySelectorAll('.table.batsman tbody tr');
    for (var i = 0, j = 1; i < teamRows.length - 1; i += 2, j++) {
        var row = teamRows[i];
        var cells = row.querySelectorAll('td');
        var name = cells[0].textContent;
        name = handleKeeper(name);
        name = handleCaptain(name);
        name = name.trim();
        var out = cells[0].classList.contains("out");
        var url = cells[0].querySelector('a').getAttribute("href");

        var runs = parseInt(cells[2].textContent, 10);
        var balls = parseInt(cells[3].textContent, 10);
        console.log(j + ". " + name + " -> " + runs + " runs on " + balls + " balls.");
        addPlayerToTeam(name, url, runs, balls, out, teamName);
    }
}

function getTeamName(textContent) {
    var indexOfInnings = textContent.indexOf("Innings")excel;
    return textContent.substr(0, indexOfInnings - 1);
}

function handleMatchPage(err, response, body) {
    var dom = new jsdom.JSDOM(body);
    var window = dom.window;
    var document = window.document;

    var scorecards = document.querySelectorAll("div.card.content-block.match-scorecard-table");
    var teamOne = getTeamName(scorecards[0].querySelector("h5.header-title").textContent);
    var teamTwo = getTeamName(scorecards[1].querySelector("h5.header-title").textContent);

    console.log("------------------------------------------------");
    console.log("------------------------------------------------");
    console.log(teamOne + " vs " + teamTwo);
    handleTeam(scorecards[0], teamOne);
    handleTeam(scorecards[1], teamTwo);

    handleMatchPage.counter++;
    if (handleMatchPage.counter == handleMatchPage.matches) {
        generateExcel();
    }
}

function handleSeriesPage(err, response, body) {
    var dom = new jsdom.JSDOM(body);
    var window = dom.window;
    var document = window.document;

    var stories = document.querySelectorAll(".match-score-block");
    handleMatchPage.counter = 0;
    handleMatchPage.matches = 20;

    for (var i = 0; i < 20; i++) {
        var matchLink = stories[i].querySelector('a');
        var matchUrl = matchLink.getAttribute("href");
        console.log((i + 1) + ". " + matchUrl);
        request("https://www.espncricinfo.com" + matchUrl, handleMatchPage);
    }
}

request("https://www.espncricinfo.com/scores/series/8048/season/2020/indian-premier-league?view=results", handleSeriesPage);