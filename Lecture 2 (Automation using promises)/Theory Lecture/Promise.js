// //Creation of Promise

// var promise = new Promise(function executer(resolve, reject) {
//   // async code  which on compvarion calls
//   //resolve or reject
// });

// //executer is producer code which has 2 predfined callbacks resolve and reject

// // Initially promise has 2 properties
// //     1- result which is undefined
// //     2- state is pending

// // After promise is resolved the state becomes fullfilled
// // and result can be
// //     1- resolved value
// //     2- error

// // result as a value
// var promise = new Promise(function executer(resolve, reject) {
//   setTimeout(() => {
//     resolve("Some value");
//   }, 1000);
// });

// //promise resolves after 1 sec with result = Some value

// // result as an error
// var promise = new Promise(function executer(resolve, reject) {
//   setTimeout(() => {
//     reject(new Error("Some error"));
//   }, 1000);
// });

// //promise resolves after 1 sec with result = error

// // The executor should call only one resolve or one reject. Any state change is final.

// // All further calls of resolve and reject are ignored

// var promise = new Promise(function executer(resolve, reject) {
//   resolve("Some value which will be resolved");
//   resolve("Some value 2"); //Ignored
//   resolve("Some value 3"); //Ignored
//   resolve("Some value 4"); //Ignored
// });

// //The properties state and result are internal
// //To get them we have to use .then .catch and .finally

// // Getting resolved value with then

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     resolve("Some result");
//   }, 1000);
// });

// //then only works after promise has state fullfilled
// promise.then(function (receivedValue) {
//   console.log(receivedValue);
// });

// //  Getting error with then

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     reject("Some result");
//   }, 1000);
// });

// promise.then(null, function (receivedError) {
//   console.log(receivedError);
// });

// //then can handle both simultaneously
// //but promise only returns either error or some value

// promise.then(
//   function (receivedValue) {
//     console.log(receivedValue);
//   },
//   function (receivedError) {
//     console.log(receivedError);
//   }
// );

// //To handle error we can use catch also

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     reject("Some result");
//   }, 1000);
// });

// promise.catch(function (receivedError) {
//   console.log(receivedError);
// });

// //finally
// // 1-Another handler which can be atteached before then and catch
// // 2-Doesn't get any value or error like then and catch
// // 3-Instead it passed the result to next handler

// new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve("Some value");
//   }, 1000);
// })
//   .finally(function () {
//     console.log(
//       "Finally block to do cleaning tasks like deallocating resources"
//     );
//   })
//   .then(function (value) {
//     console.log(value);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// //We can attach multiple then to a promise and also to a settled promise

// // the promise becomes resolved immediately upon creation
// let promise = new Promise(function (resolve) {
//   resolve("done!");
// });

// promise.then(console.log); // done! (shows up right now)

// //Sequence of async tasks => Promise chaining

// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   });

// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 2000);
//     });
//   })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 1000);
//     });
//   })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 500);
//     });
//   })
//   .then(function (result) {
//     console.log(result);
//   });

// // The whole thing works, because a call to promise.then returns a promise, so that we can call the next .then on it.

// // When a handler returns a value, it becomes the result of that promise, so the next .then is called with it.

// // A classic newbie error: technically we can also add many .then to a single promise. This is not chaining.

// //Promise.all

function pg(value) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(value);
    }, 1000);
  });
}

// Promise.all([pg(0), pg(1), pg(2)])
//   .then(function (results) {
//     console.log(results);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// // Promises in loop

// // 1- Sequence

// let p = pg(1);

// for (let i = 2; i <= 10; i++) {
//   p = p.then(function (result) {
//     console.log(result);
//     return pg(i);
//   });
// }

// p.then(function (result) {
//   console.log(result);
// })

// 2- Parallel

for (let j = 1; j <= 5; j++){
  pg(j).then(function (result) {
    console.log(result);
  })
}