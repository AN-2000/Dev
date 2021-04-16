let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let addBtn = document.querySelector(".add");
let deleteBtn = document.querySelector(".delete");
let allFilters = document.querySelectorAll(".filter-container .fb");
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
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<div class="task-to-be-added" contenteditable>
            Enter your task here
          </div>
          <div class="modal-priority-list">
            <div class="modal-filter-container">
              <div class="modal-pink-filter modal-filter"></div>
              <div class="modal-blue-filter modal-filter"></div>
              <div class="modal-green-filter modal-filter"></div>
              <div class="modal-black-filter modal-filter modal-filter-active"></div>
            </div>
          </div>`;

  let priorityColor = "ticket-color-black";

  let allModalFilters = modal.querySelectorAll(".modal-filter");
  for (let i = 0; i < allModalFilters.length; i++) {
    allModalFilters[i].addEventListener("click", function (e) {
      if (e.currentTarget.classList.contains("modal-filter-active")) {
        priorityColor = "ticket-color-black";
        e.currentTarget.classList.remove("modal-filter-active");
      } else {
        for (let x = 0; x < allModalFilters.length; x++) {
          if (allModalFilters[x].classList.contains("modal-filter-active"))
            allModalFilters[x].classList.remove("modal-filter-active");
        }

        e.currentTarget.classList.add("modal-filter-active");
        priorityColor =
          "ticket-color-" + e.currentTarget.classList[0].split("-")[1];
      }
    });
  }

  modal
    .querySelector(".task-to-be-added")
    .addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        addTicketToGrid(priorityColor, e.currentTarget.innerText);
        modal.remove();
      }
    });

  grid.appendChild(modal);
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

function addTicketToGrid(color, task) {
  let ticket = document.createElement("div");
  ticket.classList.add("ticket");
  let id = uid();
  ticket.innerHTML = `<div class="ticket-color ${color}"></div>
          <span class="ticket-id">#${id}</span>
          <div class="task" contenteditable>
          ${task}
          </div>`;
  allTaskData = localStorage.getItem("allTasks");
  if (allTaskData == null) {
    data = [{ taskId: id, task, color }];
    localStorage.setItem("allTasks", JSON.stringify(data));
  } else {
    allTaskData = JSON.parse(allTaskData);
    currTaskData = { taskId: id, task, color };
    allTaskData.push(currTaskData);
    localStorage.setItem("allTasks", JSON.stringify(allTaskData));
  }
  ticket
    .querySelector(".ticket-color")
    .addEventListener("click", ticketColorChanger);
  ticket.querySelector(".task").addEventListener("input", editTask);
  ticket.addEventListener("click", deleteTask);
  grid.appendChild(ticket);
}

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
  if (e.currentTarget.classList[2] == "active") {
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
