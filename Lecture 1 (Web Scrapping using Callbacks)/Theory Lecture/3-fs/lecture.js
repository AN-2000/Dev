const fs = require("fs");

//Sync folder creation

fs.mkdirSync("./demo");
fs.mkdirSync("./demo2");

//Sync folder deletion

fs.rmdirSync("./demo2");

//Sync file write

fs.writeFileSync("syncFile.txt", "This is a sync file")

//Sync readFile => returns buffer

let fileData = fs.readFileSync("./syncFile.txt")
console.log(fileData);
console.log(fileData.toString());
console.log();

//Async writeFile
fs.writeFile("demo.txt", "This is a demo file", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File has been created");
    console.log();
  }
});

//Async readFile (buffer version)
fs.readFile("demo.txt", function (err, data) {
  if (!err) {
    console.log("DATA:");
    console.log(data);
    console.log();
  } else {
    console.log(err);
  }
});

//Async readFile (string version)
fs.readFile("demo.txt", function (err, data) {
  if (!err) {
    console.log("DATA:");
    console.log(data.toString());
    console.log();
  } else {
    console.log(err);
  }
});
