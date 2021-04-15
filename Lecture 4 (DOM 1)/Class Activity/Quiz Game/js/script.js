let body = document.querySelector("body");
let startBtn = document.querySelector(".start-button");
let mainHeading = document.querySelector(".main-heading");
//2
//transparent sheet contains question
let questionContainer;
//array of questions to be store in data var
let data;
//users current score
let score = 0;
//current question 
let currentQuestion = 1;

// used to get data from server right now from a file 
fetch("../data/questions.json")
  .then((response) => {
    return response.json();
  })
  .then((d) => {
    data = d;
  });

function destory(element, after = 0) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      element.remove();
      resolve();
    }, after);
  });
}

//create function will just create the element and add function will actually add the element in the dom tree

//classes is array of strings
function create(type, classes) {
  return new Promise(function (resolve, reject) {
    let el = document.createElement(type);
    for (x in classes) {
      el.classList.add(classes[x]);
    }
    resolve(el);
  });
}

function addElement(parent, element, after = 0) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      parent.appendChild(element);
      resolve();
    }, after);
  });
}

function addDelay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

async function addQuestion(questionContainer) {
  let question = await create("p", []);
  question.innerText = data[currentQuestion - 1].question;
  questionContainer.appendChild(question);
  await addElement(body, questionContainer, 400);
  let currQuestionOptions = data[currentQuestion - 1].options;
  for (let i = 1; i <= 4; i++) {
    let option = await create("div", [
      "ans",
      "ans-top",
      `ans-left-${i}`,
      "animation-fade-in",
    ]);
    let attr = document.createAttribute("data-id");
    attr.value = i;
    option.setAttributeNode(attr);
    option.innerText = currQuestionOptions[i - 1];
    option.addEventListener("click", optionListener);
    await addElement(body, option, 150);
  }
}

async function optionListener(e) {
 
 //e.detail gives number of consecutive clicks 
  //to handle multi-click
  if (e.detail > 1) return;
  let allOptions = document.querySelectorAll("[data-id]");
  //this is to check if all four options are loaded or not
  if (allOptions.length < 4) return;
  let ans = e.currentTarget.getAttribute("data-id");
  let dArr = [];
  //to remove all 4 options
  for (let x = 0; x < 4; x++) {
    allOptions[x].classList.add("animation-fade-out");
    dArr.push(destory(allOptions[x], 400));
  }
  await Promise.all(dArr);
  questionContainer.classList.add("animation-leave-left");
  await addDelay(400);
  await destory(questionContainer);
  let modal = await create("div", ["model"]);
  if (ans == data[currentQuestion - 1].ans) {
    score++;
    modal.innerHTML = "<i class='material-icons'>check_circle</i>";
  } else {
    score--;
    modal.innerHTML = "<i class='material-icons'>cancel</i>";
  }
  modal.classList.add("animation-enter-top");
  body.appendChild(modal);
  await addDelay(1500);
  modal.classList.remove("animation-enter-top");
  modal.classList.add("animation-fade-out-modal");
  await destory(modal, 400);
  if (currentQuestion < data.length) {
    questionContainer = await create("div", [
      "question-container",
      "animation-suck-out",
    ]);
    currentQuestion++;
    await addQuestion(questionContainer);
  } else {
    modal.innerHTML = `<p>SCORE:<br>${score}<p>`;
    modal.classList.remove("animation-fade-out-modal");
    modal.classList.add("animation-enter-top");
    body.appendChild(modal);
  }
}

startBtn.addEventListener("click", async function () {
  mainHeading.classList.add("animation-suck-in");
  await Promise.all([destory(mainHeading, 400), destory(startBtn)]);
  questionContainer = await create("div", [
    "question-container",
    "animation-suck-out",
  ]);
  await addQuestion(questionContainer);
});
