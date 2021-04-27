let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let allFilters = document.querySelectorAll(".filter");
let addBtn = document.querySelector(".add");

// for v5
if (localStorage.getItem("allTasks") == null) {
  localStorage.setItem("allTasks", JSON.stringify([]));
}

//for v4
let deleteBtn = document.querySelector(".delete");
let deleteState = false;

body.spellcheck = false;

// for v5
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

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", filterHandler);
}

addBtn.addEventListener("click", addEventHandler);

// for v3
function addEventHandler(e) {
  // for v4
  deleteState = false;
  deleteBtn.classList.remove("active");
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<div class="task-to-be-added" data-typed="false" contenteditable>
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

  modal
    .querySelector(".task-to-be-added")
    .addEventListener("click", function (e) {
      if (e.currentTarget.getAttribute("data-typed") == "false") {
        e.currentTarget.setAttribute("data-typed", "true");
        e.currentTarget.innerHTML = "";
      }
    });

  let priorityColor = "ticket-color-black";

  let allModalFilters = modal.querySelectorAll(".modal-filter");
  // to set colour of ticket by toggling active class
  // ticket color scheme works in 2 ways
  // 1 - if you select something 2 times the priority color would be set to black
  // 2- else to selected colour
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

  //yhase hum ui pr ticket add kr rhe hai
  modal
    .querySelector(".task-to-be-added")
    .addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        addTicketToGrid(priorityColor, e.currentTarget.innerText);
        modal.remove();
      }
    });

  grid.appendChild(modal);
}

// for v3
function addTicketToGrid(color, task) {
  let ticket = document.createElement("div");
  ticket.classList.add("ticket");
  let id = uid();
  ticket.innerHTML = `<div class="ticket-color ${color}"></div>
          <span class="ticket-id">#${id}</span>
          <div class="task" contenteditable>
          ${task}
          </div>`;
  // for v4
  ticket
    .querySelector(".ticket-color")
    .addEventListener("click", ticketColorChanger);
  // for v4

  ticket.addEventListener("click", deleteTask);
  ticket.querySelector(".task").addEventListener("input", editTask);
  // for v5
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

  grid.appendChild(ticket);
}

// for v4
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


  // yha id ka use h localStorage me colour change krne kelie 
// for v5 
  let allTaskData = JSON.parse(localStorage.getItem("allTasks"));
  e = e.currentTarget.parentElement;
  let taskId = e.querySelector(".ticket-id").innerHTML;
  let taskIndex = allTaskData.findIndex((p) => {
    return "#" + p.taskId == taskId;
  });
  allTaskData[taskIndex].color = allTicketColor[currIndex];
  localStorage.setItem("allTasks", JSON.stringify(allTaskData));
}

// for v4
// deleteState true krne ka mtlb ki kisi bhi ticket pr click krenge to wo delete hojaiga
deleteBtn.addEventListener("click", function () {
  if (!deleteState) {
    deleteState = true;
    deleteBtn.classList.add("active");
  } else {
    deleteState = false;
    deleteBtn.classList.remove("active");
  }
});

// for v4

function deleteTask(e) {
  if (deleteState) {
    // for v5 
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
// for v5 
  let allTaskData = JSON.parse(localStorage.getItem("allTasks"));
  e = e.currentTarget.parentElement;
  let taskId = e.querySelector(".ticket-id").innerHTML;
  let taskIndex = allTaskData.findIndex((p) => {
    return "#" + p.taskId == taskId;
  });
  allTaskData[taskIndex].task = text;
  localStorage.setItem("allTasks", JSON.stringify(allTaskData));
}

// for v6 => 3 
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
  
  let c = "ticket-color-"+e.currentTarget.children[0].classList[0].split("-")[0];
  loadTasks(c);
}