// Questions on topics:
    // Console statement
    // variables
    // dynamic nature of var
    // loop briefing
    // brief into let and const
    // functions
    // arrays
    // strings
    // objects brief



// q1 output question

// var p = console.log
// p("Hi");
// print("Hi")
// var print = p;

// q2 output question

// var num = 5.5;
// num = 10;
// num = 2.2;
// num = num + 10
// num = true;
// num += 10;
// console.log(num);

//q3 question

//Print 10 numbers(for loop)

//q4 question

//Print table(while loop)

//q5 question

//Print Fibonacci(do-while loop)

//q6 output question

// var a = 10;
// var a = 50;
// console.log(a);

//q7 output question

// var a = 20;
// let a = 20
// console.log(a);

//q8 output question

// const num = 5;
// console.log(num + 5);
// let a = 6;
// a = a + num;
// console.log(num - a);

//q9 output question

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

// q10 output question

// let b;
// const a = 6;
// {
//     let a = 5;
// }
// let b = a;

// console.log(a);
// console.log(b);

//q11 output question

// let Const = 2;
// console.log(Const);
// const b = 3;
// console.log(b++);


//q12 output question

// function f(a) {
//     a = a + 2
// }

// console.log(f(2));


//q13 create a function 
    // takes input :
        //1- First number of AP series (5)
        //2- n (3)
        //3- common difference (2)
    // output:
        //1- None
    // returns:
        //1-nth term 


//q14 create a function
    //takes input :
        //1- First number of GP series (2)
        //2- n (5)
        //3- common ratio (2)
    //output :
        //1- N terms of GP    
    //returns :
        //1- None


//q15 Store n-terms of factorial starting from 1! in array

//q16 output question

// let arr = []
// arr[2] = 3;
// arr[0] = 1;
// console.log(arr[2 * arr[2] - 6 * arr[0]]);
// arr[1] += arr[0] + arr[2]
// console.log(arr[1]);

//q17 Given a 5x5 matrix containing first n terms of n-agp series 
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


//q18 create a function using split & slice
    //takes input :
        // 1-Masked credit card number(############3458)
    //returns:
        // 1-Last 4 digits in array


// q19 create a function
    //takes input :
        //1- Full Name
    //Returns:
        //Initials using trim and split


//q20 given an array of objects,
// each Object containing city name and 
// array of rainfall of last 7 days in mm
// print highest rainfaill for each city 

[
    { name: "Delhi", rainfaill: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
    { name: "Noida", rainfaill: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
    { name: "Dehradun", rainfaill: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
    { name: "Nanital", rainfaill: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] }
]

// q21 using the data in previous question return 
// an array of objects each object containing 
// city name and average rainfall