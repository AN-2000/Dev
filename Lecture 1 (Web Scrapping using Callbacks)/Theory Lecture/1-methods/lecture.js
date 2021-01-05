//Array creation

var arr = [1, 2, 3];
arr = Array("Hi", "All");

//Array indexing
console.log("Array:", arr);
console.log("2nd Element of array:", arr[1]);

console.log("-----------------------------------------------------");

//Array Length
console.log("Length of Array:", arr.length);

console.log("------------------------------------------------------");

//slice => non-mutable
arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

console.log("No Arguments");
console.log(arr.slice());
console.log(arr);

console.log("Start Index");
console.log(arr.slice(2));
console.log(arr);

console.log("Start Index and End Index");
console.log(arr.slice(2, 5));
console.log(arr);

console.log("-------------------------------------------------------");

//find method

let elementFound = arr.find(function (p) {
  return p == "a";
});

console.log("Element found:", elementFound);

let elementNotFound = arr.find(function (p) {
  return p == "z";
});

console.log("Element not found:", elementNotFound);

console.log("-------------------------------------------------------");

//findIndex method

let elementIndexFound = arr.findIndex(function (p) {
  return p == "c";
});

console.log("Element index found:", elementIndexFound);

let elementIndexNotFound = arr.findIndex(function (p) {
  return p == "z";
});

console.log("Element index not found:", elementIndexNotFound);

console.log("-------------------------------------------------------");

//split method => non - mutable

let str = "Web-Scrapping-with-Cheeio";
let splittedArray = str.split("-");

console.log("Example 1:")
console.log("String:",str)
console.log("Splitted array:", splittedArray);

let str2 = "Split using spaces"
splittedArray = str2.split(" ")

console.log("Example 2:");
console.log("String:", str2);
console.log("Splitted array:", splittedArray);

console.log("-------------------------------------------------------");

//trim method => non - mutable

let nameWithSpace = "          Scrapped   ";
let nameWithoutSpace = nameWithSpace.trim();

console.log("Trimmed Word:",nameWithSpace);
console.log("Non trimmed word:",nameWithoutSpace);


