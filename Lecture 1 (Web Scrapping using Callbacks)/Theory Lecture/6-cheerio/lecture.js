let cheerio = require("cheerio")
const request = require("request");


request("https://www.pepcoding.com/courses", function (err, res, body) {
    if (!err) {
        let justSomeVariable = cheerio.load(body)
        let allCourses = justSomeVariable(".white-text.right.course-name-text.bolder");
        for (let i = 0; i < allCourses.length/2; i++){
            
            console.log(justSomeVariable(allCourses[i]).text())

        }
    }
});
