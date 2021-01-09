//async keyword
//makes the function so that it always returns a promise.

//Promises always work asynchronously but async function can work in sync if all code is sync code inside it.

async function f() {
  return "Hello";
}

f().then(function (result) {
  console.log(result);
});

// We can also do this explicitly

async function f2() {
  return new Promise(function (resolve, reject) {
    resolve("Hi");
  });
}

f2().then(function (result) {
  console.log(result);
});

//await keyword => makes inner world of async function sync if promises are used
// or stops the execution of the function till promise is resolved

function pg() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(2);
      resolve();
    }, 1000);
  });
}

async function f3() {
  console.log(3);
  await pg();
  console.log(1);
}

f3();
