// ── Sidebar ──

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (i) {
      i.classList.remove("active");
    });
    item.classList.add("active");
  });
});

// ── New Entry Modal (Modal 1 — type selector) ──

const newEntryBtn = document.querySelector(".new-entry-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const cancelBtn = document.querySelector(".modal-cancel");

newEntryBtn.addEventListener("click", function () {
  modalOverlay.classList.add("active");
});

cancelBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", function (e) {
  if (e.target == modalOverlay) modalOverlay.classList.remove("active");
});

// ── Entry Form Modal (Modal 2 — write entry) ──

const optionCards = document.querySelectorAll(".option-card");
const modalOverlay2 = document.querySelector(".modal-overlay-2");
const entryCancelBtn = document.querySelector(".entry-cancel-btn");
const entrySubmitBtn = document.querySelector(".entry-submit-btn");
const titleInput = document.querySelector(".entry-title");
const bodyInput = document.querySelector(".entry-body");
const timeline = document.querySelector(".journal-timeline");
const nullEntry = document.querySelector(".null-entry-error");
optionCards.forEach(function (card) {
  card.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    modalOverlay2.classList.add("active");
  });
});

entryCancelBtn.addEventListener("click", function () {
  modalOverlay2.classList.remove("active");
});

modalOverlay2.addEventListener("click", function (e) {
  if (e.target == modalOverlay2) modalOverlay2.classList.remove("active");
});

entrySubmitBtn.addEventListener("click", function () {
  const title = titleInput.value;
  const body = bodyInput.value;

  const entry = {
    title: title,
    body: body,
    time: new Date().toLocaleTimeString(),
  };

  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  modalOverlay2.classList.remove("active");
  titleInput.value = "";
  bodyInput.value = "";

  const newEntry = document.createElement("div");
  const preview =
    entry.body.length > 100 ? entry.body.substring(0, 100) + "..." : entry.body;

  newEntry.classList.add("journal-entry");
  newEntry.innerHTML = `
      <div class="journal-dot"></div>
      <div class="journal-content">
        <span class="journal-time">${entry.time}</span>
        <h3 class="journal-title">${entry.title}</h3>
        <p class="journal-preview">${preview}</p>
      </div>
    `;

  timeline.appendChild(newEntry);
});

// ── Journal Timeline — Load from localStorage ──

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];

  entries.forEach(function (entry) {
    const newEntry = document.createElement("div");
    const preview =
      entry.body.length > 100
        ? entry.body.substring(0, 100) + "..."
        : entry.body;

    newEntry.classList.add("journal-entry");
    newEntry.innerHTML = `
        <div class="journal-dot"></div>
        <div class="journal-content">
          <span class="journal-time">${entry.time}</span>
          <h3 class="journal-title">${entry.title}</h3>
          <p class="journal-preview">${preview}</p>
        </div>
      `;

    timeline.appendChild(newEntry);
  });
}

// ── View All Logs Modal (Modal 3 — manage entries) ──

const modalOverlay3 = document.querySelector(".modal-overlay-3");
const logList = document.querySelector(".logs-list");
const viewLogs = document.querySelector(".view-logs");
const cancelBtn3 = document.querySelector(".modal-cancel-3");

function renderLogs() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  logList.innerHTML = "";

  entries.forEach(function (entry, index) {
    const row = document.createElement("div");
    row.classList.add("log-row");
    row.innerHTML = `
        <span>${entry.title}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
    logList.appendChild(row);

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      const i = parseInt(this.getAttribute("data-index"));
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.splice(i, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderLogs();
    });
  });
}

viewLogs.addEventListener("click", function () {
  modalOverlay3.classList.add("active");
  renderLogs();
});

cancelBtn3.addEventListener("click", function () {
  modalOverlay3.classList.remove("active");
});

modalOverlay3.addEventListener("click", function (e) {
  if (e.target == modalOverlay3) modalOverlay3.classList.remove("active");
});

// Habit section

const modalOverlay4 = document.querySelector(".modal-overlay-4");
const manageHabit = document.querySelector(".manage-habits");
const habitName = document.querySelector(".habit-name");
const habitGoal = document.querySelector(".habit-goal");
const habitCheckbox = document.querySelector(".habit-checkbox");
let selectedColor = "#059669";
const streakList = document.querySelector(".streak-list");
const colorOptions = document.querySelectorAll(".color-option");

colorOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    colorOptions.forEach(function (o) {
      o.classList.remove("active");
    });
    option.classList.add("active");
    selectedColor = option.style.background;
  });
});

manageHabit.addEventListener("click", function () {
  modalOverlay4.classList.add("active");
});

const saveHabit = document.querySelector(".habit-save-button");
const cancelHabit = document.querySelector(".habit-cancel-btn");

cancelHabit.addEventListener("click", function () {
  modalOverlay4.classList.remove("active");
});

saveHabit.addEventListener("click", function () {
  const name = habitName.value;
  const goal = parseInt(habitGoal.value);

  const habit = {
    name: name,
    goal: goal,
    streak: 0,
    color: selectedColor,
  };

  if (!name || !goal) return;

  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push(habit);
  localStorage.setItem("habits", JSON.stringify(habits));

  modalOverlay4.classList.remove("active");
  habitName.value = "";
  habitGoal.value = "";

  renderHabit(habit);
});

function renderHabit(habit, index) {
  const width = Math.min((habit.streak / habit.goal) * 100, 100);
  const item = document.createElement("div");

  item.classList.add("streak-item");

  item.innerHTML = `
    
    <div class="streak-icon"></div>
    <div class="streak-middle">
    <span class="streak-title">${habit.name}</span>
    <div class="progress-track">
    <div class="progress-fill" style= "background:${habit.color}; width: ${width}%"></div>
    </div>
    </div>
    <span class="streak-days">${habit.streak} Days</span>
    <input type="checkbox" class="habit-checkbox" data-index="${index}">
    
    
    `;
  streakList.appendChild(item);

  const checkBox = item.querySelector(".habit-checkbox");
  checkBox.addEventListener("click", function () {
    if (checkBox.checked) {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      const i = parseInt(this.getAttribute("data-index"));
      habits[i].streak++;

      const newWidth = Math.min((habits[i].streak / habits[i].goal) * 100, 100);
      item.querySelector(".progress-fill").style.width = newWidth + "%";
      item.querySelector(".streak-days").textContent =
        habits[i].streak + " days";

      if (habits[i].streak >= habits[i].goal) {
        habits.splice(i, 1);
        localStorage.setItem("habits", JSON.stringify(habits));

        return;
      }
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  });
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.forEach(function (habit, index) {
    renderHabit(habit, index);
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    modalOverlay.classList.remove("active");
    modalOverlay2.classList.remove("active");
    modalOverlay3.classList.remove("active");
    modalOverlay4.classList.remove("active");
  }
});

document.addEventListener("click", function (e) {
  if (e.target == modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});
document.addEventListener("click", function (e) {
  if (e.target == modalOverlay2) {
    modalOverlay2.classList.remove("active");
  }
});
document.addEventListener("click", function (e) {
  if (e.target == modalOverlay3) {
    modalOverlay3.classList.remove("active");
  }
});
document.addEventListener("click", function (e) {
  if (e.target == modalOverlay4) {
    modalOverlay4.classList.remove("active");
  }
});

// Block of code used for changing tabs on click
const dashboard = document.querySelector(".dashboard");
const focusPage = document.querySelector(".focus");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (i) {
      i.classList.remove("active");
    });
    item.classList.add("active");

    const label = item.querySelector("span").textContent;

    localStorage.setItem("activePage", label);

    if (label === "Focus Mode") {
      dashboard.style.display = "none";
      focusPage.style.display = "flex";
    } else {
      dashboard.style.display = "block";
      focusPage.style.display = "none";
    }
  });
});

// Focus Page JS
const taskDuration = document.querySelector(".task-duration");
const focusTimer = document.querySelector(".focus-timer");
let totalSeconds = 25 * 60;
let timerInterval = null;
let isRunning = false;
let minutes = 0;
let seconds = 0;

const endSession = document.querySelector(".focus-end-session-btn");
endSession.addEventListener("click", function () {
  clearInterval(timerInterval);
  isRunning = false;

  totalSeconds = 25 * 60;

  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  let display = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  document.querySelector(".timer-display").textContent = display;
});

function tick() {
  totalSeconds--;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  let display = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  document.querySelector(".timer-display").textContent = display;
  if (totalSeconds <= 0) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

focusTimer.addEventListener("click", function () {
  focusTimer.classList.add("clicked");
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  } else {
    focusTimer.classList.remove("clicked");
    tick();
    timerInterval = setInterval(tick, 1000);
    isRunning = true;
  }
});

const modalOverlay5 = document.querySelector(".modal-overlay-5");
const addQueueBtn = document.querySelector(".add-to-queue-btn");
const taskInput = document.querySelector(".task-name");
const queueList = document.querySelector(".queue-list");
const addTaskBtn = document.querySelector(".task-submit-btn");
const resumeFocusBtn = document.querySelector(".resume-btn");

resumeFocusBtn.addEventListener("click", function () {
  showFocusPage();
});

addQueueBtn.addEventListener("click", function () {
  modalOverlay5.classList.add("active");
});

modalOverlay5.addEventListener("click", function (e) {
  if (e.target == modalOverlay5) {
    modalOverlay5.classList.remove("active");
    nullEntry.textContent = "";
  }
});

addTaskBtn.addEventListener("click", function () {
  const taskName = taskInput.value;
  const duration = taskDuration.value;

  const task = {
    taskName: taskName,
    duration: duration,
  };

  // if(taskName == "" || duration === ""){
  //   alert("Fill all the fields!");
  //   return;
  // }

  if (!validate(taskName, duration)) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  modalOverlay5.classList.remove("active");
  taskInput.value = "";
  taskDuration.value = "";

  const newTask = document.createElement("div");

  newTask.classList.add("task-entry");
  newTask.innerHTML = `
  <div class="queue-item">
    <div class="queue-content">
      <span class="queue-tag">NEXT UP</span>
      <p class="queue-task-name">${task.taskName}</p>
      <span class="queue-duration">${task.duration} MINS</span>
    </div>

    <button class="queue-delete-btn">Delete</button>
  </div>
`;
  queueList.appendChild(newTask);

  const queueDeleteBtn = newTask.querySelector(".queue-delete-btn");
  queueDeleteBtn.addEventListener("click", function () {
    const confirmed = confirm("Delete this task?");
    if (confirmed) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const allItems = queueList.querySelectorAll(".task-entry");
      const index = Array.from(allItems).indexOf(newTask);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      newTask.remove();
    }
  });
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task, index) {
    const newTask = document.createElement("div");

    newTask.classList.add("task-entry");
    newTask.innerHTML = `
      <div class="queue-item">
        <div class="queue-content">
          <span class="queue-tag">NEXT UP</span>
          <p class="queue-task-name">${task.taskName}</p>
          <span class="queue-duration">${task.duration} MINS</span>
        </div>

        <button class="queue-delete-btn">Delete</button>
      </div>
    `;

    queueList.appendChild(newTask);

    const deleteBtn = newTask.querySelector(".queue-delete-btn");

    deleteBtn.addEventListener("click", function () {
      const confirmed = confirm("Delete this task?");
      if (!confirmed) return;

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      newTask.remove();
    });
  });
}

function restorePage() {
  const activePage = localStorage.getItem("activePage");

  if (activePage === "Focus Mode") {
    dashboard.style.display = "none";
    focusPage.style.display = "flex";

    menuItems.forEach(function (item) {
      item.classList.remove("active");

      if (item.querySelector("span").textContent === "Focus Mode") {
        item.classList.add("active");
      }
    });
  }
}

function validate(input1, input2) {
  console.log("validator called");

  if (input1 === "" || input2 === "") {
    nullEntry.textContent = "Please fill all the fields";
    return false;
  }
  nullEntry.textContent = "";
  return true;
}

function showFocusPage() {
  dashboard.style.display = "none";
  focusPage.style.display = "flex";

  localStorage.setItem("activePage", "Focus Mode");

  menuItems.forEach(function (item) {
    item.classList.remove("active");

    if (item.querySelector("span").textContent === "Focus Mode") {
      item.classList.add("active");
    }
  });
}

loadEntries();
loadHabits();
loadTasks();
restorePage();
