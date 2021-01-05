//Why? => JS is event-driven and non-blocking
//Callbacks can be synchronous and asynchronous

//What are callbacks => A function passed to another function to be called later

//Synchronous => each statement works sequentially and waits for previous statement to finish
//Asynchronous => no sequence of statements is maintained and are skipped

// Synchronous callbacks

function theCallbackFunction() {
  console.log("callback is being called!");
}

function theActualFunction(callback) {
  console.log("The actual function was called");
  console.log("Its now calling the passed function aka callback");
  callback();
}

theActualFunction(theCallbackFunction);

//Asynchronous callback

function theAsyncCallback() {
  console.log("Async calback is being called");
}

function theActualFunction2(callback) {
    console.log("This is actual function 2");
    console.log("I'm doing some async work");
    console.log("I'll use the function passed aka callback after I'm done");
  setTimeout(callback, 2000);
}

theActualFunction2(theAsyncCallback);
