// q1 output question 

// var p = console.log
// p("Hi");
// print("Hi");
// var print = p;



//q2 question

//Print table(while loop)

//q3 question

//Print Fibonacci(do-while loop)

//q4 output question 

// var a = 10;
// var a = 50;
// console.log(a);

//q5 output question

// var a = 20;
// let a = 20
// console.log(a);

//q6 output question

// const num = 5;
// console.log(num + 5);
// let a = 6;
// a = a + num;
// console.log(num - a);

//q7 output question

// let a = 2;
// {
//   let a = 3;
//   {
//     let a = 4;
//     {
//       let a = 5;
//       console.log(a);
//     }
//     console.log(a);
//   }
//   console.log(a);
// }
// console.log(a);

// q8 output question

// let b;
// const a = 6;
// {
//     let a = 5;
// }
// let b = a;

// console.log(a);
// console.log(b);

//q9 output question

// let Const = 2;
// console.log(Const);
// const b = 3;
// console.log(b++);



//q10 create a function
    //takes input :
        //1- First number of GP series (2)
        //2- n (5)
        //3- common ratio (2)
    //output :
        //1- N terms of GP    
    //returns :
        //1- None

//q11 Given a 5x5 matrix containing first n terms of n-agp series 
    //formula:[a+(n−1)d]r^(n−1)
    //Find the index of agp term using findIndex also the number using find
    //with given a,n,r,d  
        //a = first term => 4
        //n = nth number => 3
        //r = common ratio => 1
        //d = common difference => 5

        // matrix:
        
        [
          [5, 16, 44, 112, 272],
          [4, 35, 250, 1625, 10000],
          [4, 9, 14, 19, 24],
          [4, 12, 32, 80, 192],
          [3, 35, 343, 3087, 26411],
];
        

// q12

// Setup
// let collection = {
//   2548: {
//     albumTitle: 'Slippery When Wet',
//     artist: 'Bon Jovi',
//     tracks: ['Let It Rock', 'You Give Love a Bad Name']
//   },
//   2468: {
//     albumTitle: '1999',
//     artist: 'Prince',
//     tracks: ['1999', 'Little Red Corvette']
//   },
//   1245: {
//     artist: 'Robert Palmer',
//     tracks: []
//   },
//   5439: {
//     albumTitle: 'ABBA Gold'
//   }
// };

// // Only change code below this line
// function updateRecords(object, id, prop, value) {
//   return object;
// }

// updateRecords(collection, 5439, 'artist', 'ABBA');

// You are given a JSON object representing a part of your musical album collection. Each album has a unique id number as its key and several other properties. Not all albums have complete information.

// You start with an updateRecords function that takes an object like collection, an id, a prop (like artist or tracks), and a value. Complete the function using the rules below to modify the object passed to the function.

// Your function must always return the entire object.
// If prop isn't tracks and value isn't an empty string, update or set that album's prop to value.
// If prop is tracks but the album doesn't have a tracks property, create an empty array and add value to it.
// If prop is tracks and value isn't an empty string, add value to the end of the album's existing tracks array.
// If value is an empty string, delete the given prop property from the album.
// Note: A copy of the collection object is used for the tests.


// q13

// Setup
// let contacts = [
//     {
//         "firstName": "Akira",
//         "lastName": "Laine",
//         "number": "0543236543",
//         "likes": ["Pizza", "Coding", "Brownie Points"]
//     },
//     {
//         "firstName": "Harry",
//         "lastName": "Potter",
//         "number": "0994372684",
//         "likes": ["Hogwarts", "Magic", "Hagrid"]
//     },
//     {
//         "firstName": "Sherlock",
//         "lastName": "Holmes",
//         "number": "0487345643",
//         "likes": ["Intriguing Cases", "Violin"]
//     },
//     {
//         "firstName": "Kristian",
//         "lastName": "Vos",
//         "number": "unknown",
//         "likes": ["JavaScript", "Gaming", "Foxes"]
//     }
// ];


// function lookUpProfile(name, prop){
// // Only change code below this line

// // Only change code above this line
// }

// lookUpProfile("Akira", "likes");


// We have an array of objects representing different people in our contacts lists.

// A lookUpProfile function that takes name and a property (prop) as arguments has been pre-written for you.

// The function should check if name is an actual contact's firstName and the given property (prop) is a property of that contact.

// If both are true, then return the "value" of that property.

// If name does not correspond to any contacts then return "No such contact".

// If prop does not correspond to any valid properties of a contact found to match name then return "No such property".


// q14

[
    { name: "Delhi", rainfaill: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
    { name: "Noida", rainfaill: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
    { name: "Dehradun", rainfaill: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
    { name: "Nanital", rainfaill: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] }
]

// using the data return 
// an array of objects each object containing 
// city name and average rainfall