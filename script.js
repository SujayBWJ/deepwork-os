const menuItems = document.querySelectorAll(".menu-item");
const timeline = document.querySelector(".journal-timeline");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (i) {
      i.classList.remove("active");
    });
    item.classList.add("active");
  });
});

const newEntryBtn = document.querySelector(".new-entry-btn");
const modalOverlay = document.querySelector(".modal-overlay");

newEntryBtn.addEventListener("click", function () {
  modalOverlay.classList.add("active");
});

const cancelBtn = document.querySelector(".modal-cancel");

cancelBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", function (e) {
  if (e.target == modalOverlay) modalOverlay.classList.remove("active");
});

const optionCards = document.querySelectorAll(".option-card");
const modalOverlay2 = document.querySelector(".modal-overlay-2");

optionCards.forEach(function (card) {
  card.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    modalOverlay2.classList.add("active");
  });
});

const entryCancelBtn = document.querySelector(".entry-cancel-btn");
const entrySubmitBtn = document.querySelector(".entry-submit-btn");

entryCancelBtn.addEventListener("click", function () {
  modalOverlay2.classList.remove("active");
});

modalOverlay2.addEventListener("click", function (e) {
  if (e.target == modalOverlay2) modalOverlay2.classList.remove("active");
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    modalOverlay.classList.remove("active");
    modalOverlay2.classList.remove("active");
  }
});

const titleInput = document.querySelector(".entry-title");
const bodyInput = document.querySelector(".entry-body");

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

  console.log(entries);
}

loadEntries();
