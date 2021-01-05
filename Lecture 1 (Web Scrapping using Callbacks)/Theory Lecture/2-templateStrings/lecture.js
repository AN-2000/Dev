let normalString = "Cannot be multiline and have variables in between"

let someVariable = 10;

let templateString = `
    How many fingers do we have (thumbs included)?
    ${someVariable}
`

console.log("Normal String:", normalString);
console.log("---------------------------------------");
console.log("Template String:", templateString);