let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let addBtn = document.querySelector(".add");
let deleteBtn = document.querySelector(".delete");
let allFilters = document.querySelectorAll(".filter-container div");
let deleteState = false;

body.spellcheck = false;

if (localStorage.getItem("allTasks") == null) {
  localStorage.setItem("allTasks", JSON.stringify([]));
}

for (let j = 0; j < allFilters.length; j++) {
  allFilters[j].addEventListener("click", filterHandler);
}

function loadTasks(color) {
  grid.innerHTML = "";
  let taskDataPreLoad = JSON.parse(localStorage.getItem("allTasks"));

  if (color) taskDataPreLoad = taskDataPreLoad.filter((p) => p.color == color);

  for (let i = 0; i < taskDataPreLoad.length; i++) {
    let ticket = document.createElement("div");
    ticket.classList.add("ticket");
    ticket.innerHTML = `<div class="ticket-color ${taskDataPreLoad[i].color}"></div>
          <span class="ticket-id">#${taskDataPreLoad[i].taskId}</span>
          <div class="task" contenteditable>
          </div>`;

    ticket
      .querySelector(".ticket-color")
      .addEventListener("click", ticketColorChanger);
    ticket.querySelector(".task").addEventListener("input", editTask);
    ticket.querySelector(".task").innerHTML = taskDataPreLoad[i].task;
    ticket.addEventListener("click", deleteTask);
    grid.appendChild(ticket);
  }
}

loadTasks();

addBtn.addEventListener("click", function () {
  deleteState = false;
  deleteBtn.classList.remove("active");

  let ticket = document.createElement("div");
  ticket.classList.add("ticket");
  let id = uid();
  ticket.innerHTML = `<div class="ticket-color ticket-color-black"></div>
          <span class="ticket-id">#${id}</span>
          <div class="task" contenteditable>
          </div>`;
  allTaskData = localStorage.getItem("allTasks");
  if (allTaskData == null) {
    data = [{ taskId: id, task: "", color: "ticket-color-black" }];
    localStorage.setItem("allTasks", JSON.stringify(data));
  } else {
    allTaskData = JSON.parse(allTaskData);
    currTaskData = { taskId: id, task: "", color: "ticket-color-black" };
    allTaskData.push(currTaskData);
    localStorage.setItem("allTasks", JSON.stringify(allTaskData));
  }

  ticket
    .querySelector(".ticket-color")
    .addEventListener("click", ticketColorChanger);
  ticket.querySelector(".task").addEventListener("input", editTask);
  ticket.addEventListener("click", deleteTask);
  grid.appendChild(ticket);
});

deleteBtn.addEventListener("click", function () {
  if (!deleteState) {
    deleteState = true;
    deleteBtn.classList.add("active");
  } else {
    deleteState = false;
    deleteBtn.classList.remove("active");
  }
});

function ticketColorChanger(e) {
  let allTicketColor = [
    "ticket-color-blue",
    "ticket-color-black",
    "ticket-color-green",
    "ticket-color-pink",
  ];
  currentColorClass = e.currentTarget.classList[1];
  let currIndex = allTicketColor.findIndex((e) => e === currentColorClass);
  e.currentTarget.classList.remove(currentColorClass);
  currIndex = (currIndex + 1) % 4;
  e.currentTarget.classList.add(allTicketColor[currIndex]);

  let allTaskData = JSON.parse(localStorage.getItem("allTasks"));
  e = e.currentTarget.parentElement;
  let taskId = e.querySelector(".ticket-id").innerHTML;
  let taskIndex = allTaskData.findIndex((p) => {
    return "#" + p.taskId == taskId;
  });
  allTaskData[taskIndex].color = allTicketColor[currIndex];
  localStorage.setItem("allTasks", JSON.stringify(allTaskData));
}

function deleteTask(e) {
  if (deleteState) {
    let allTaskData = JSON.parse(localStorage.getItem("allTasks"));
    let taskId = e.currentTarget.querySelector(".ticket-id").innerHTML;
    let taskIndex = allTaskData.findIndex((p) => {
      return "#" + p.taskId == taskId;
    });
    allTaskData.splice(taskIndex, 1);
    localStorage.setItem("allTasks", JSON.stringify(allTaskData));
    e.currentTarget.remove();
  }
}

function editTask(e) {
  let text = e.currentTarget.innerHTML;

  let allTaskData = JSON.parse(localStorage.getItem("allTasks"));
  e = e.currentTarget.parentElement;
  let taskId = e.querySelector(".ticket-id").innerHTML;
  let taskIndex = allTaskData.findIndex((p) => {
    return "#" + p.taskId == taskId;
  });
  allTaskData[taskIndex].task = text;
  localStorage.setItem("allTasks", JSON.stringify(allTaskData));
}

function filterHandler(e) {
  if (e.currentTarget.classList[1] == "active") {
    e.currentTarget.classList.remove("active");
    loadTasks();
    return;
  }

  for (let k = 0; k < allFilters.length; k++) {
    allFilters[k].classList.remove("active");
  }
  e.currentTarget.classList.add("active");
  let c = "ticket-color-" + e.currentTarget.classList[0].split("-")[0];
  loadTasks(c);
}
