const STORAGE_KEY = "lab1_items";
const items = [];
let editId = null;
const form = document.getElementById("createForm");
const tbody = document.getElementById("itemsTableBody");
const tableEl = document.getElementById("itemsTable");
const emptyState = document.getElementById("emptyState");
const submitBtn = document.getElementById("submitBtn");
const saveBtn = document.getElementById("saveBtn");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const sortOrder = document.getElementById("sortOrder");
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const loaded = JSON.parse(raw);
    loaded.forEach(function (item) { items.push(item); });
  }
}
function getFilteredItems() {
  const search = searchInput.value.trim().toLowerCase();
  const status = filterStatus.value;
  const sort = sortOrder.value;
  let result = items.filter(function (item) {
    const matchSearch = search === "" || item.userName.toLowerCase().indexOf(search) !== -1;
    const matchStatus = status === "" || item.status === status;
    return matchSearch && matchStatus;
  });
  if (sort === "date-asc") {
    result.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  } else if (sort === "date-desc") {
    result.sort(function (a, b) { return a.date > b.date ? -1 : a.date < b.date ? 1 : 0; });
  }
  return result;
}
function renderTable() {
  const visible = getFilteredItems();
  if (visible.length === 0) {
    emptyState.classList.remove("hidden");
    tableEl.classList.add("hidden");
    return;
  }
  emptyState.classList.add("hidden");
  tableEl.classList.remove("hidden");
  const rowsHtml = visible.map(function (item, index) {
    return "<tr>" +
      "<td>" + (index + 1) + "</td>" +
      "<td>" + item.userName + "</td>" +
      "<td>" + item.date + "</td>" +
      "<td>" + item.accessType + "</td>" +
      "<td>" + item.comments + "</td>" +
      "<td>" + item.status + "</td>" +
      "<td class='actions'>" +
      "<button class='btn-edit' data-id='" + item.id + "' data-action='edit'>Редагувати</button>" +
      "<button class='btn-delete' data-id='" + item.id + "' data-action='delete'>Видалити</button>" +
      "</td>" +
      "</tr>";
  }).join("");
  tbody.innerHTML = rowsHtml;
}
function clearErrors() {
  document.getElementById("userNameError").textContent = "";
  document.getElementById("dateError").textContent = "";
  document.getElementById("accessTypeError").textContent = "";
  document.getElementById("commentsError").textContent = "";
  document.getElementById("statusError").textContent = "";
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = document.getElementById("userNameInput").value;
  const date = document.getElementById("dateInput").value;
  const accessType = document.getElementById("accessTypeSelect").value;
  const comments = document.getElementById("commentsInput").value;
  const status = document.getElementById("statusSelect").value;
  clearErrors();
  let isValid = true;
  if (userName.trim() === "") {
    document.getElementById("userNameError").textContent = "Ім'я користувача є обов'язковим.";
    isValid = false;
  } else if (userName.trim().length < 3) {
    document.getElementById("userNameError").textContent = "Ім'я має бути не менше 3 символів.";
    isValid = false;
  }
  if (date === "") {
    document.getElementById("dateError").textContent = "Вкажіть дату доступу.";
    isValid = false;
  }
  if (accessType === "") {
    document.getElementById("accessTypeError").textContent = "Оберіть тип доступу.";
    isValid = false;
  }
  if (comments.trim() === "") {
    document.getElementById("commentsError").textContent = "Коментар є обов'язковим.";
    isValid = false;
  } else if (comments.trim().length < 5) {
    document.getElementById("commentsError").textContent = "Коментар має бути не менше 5 символів.";
    isValid = false;
  }
  if (status === "") {
    document.getElementById("statusError").textContent = "Оберіть статус.";
    isValid = false;
  }
  if (!isValid) return;
  const item = {
    id: String(Date.now()),
    userName: userName.trim(),
    date: date,
    accessType: accessType,
    comments: comments.trim(),
    status: status
  };
  items.push(item);
  saveToStorage();
  renderTable();
  form.reset();
  document.getElementById("statusSelect").value = "Pending";
});
document.getElementById("resetBtn").addEventListener("click", function () {
  if (editId !== null) {
    cancelEdit();
  }
  form.reset();
  document.getElementById("statusSelect").value = "Pending";
  clearErrors();
});
saveBtn.addEventListener("click", function () {
  const userName = document.getElementById("userNameInput").value;
  const date = document.getElementById("dateInput").value;
  const accessType = document.getElementById("accessTypeSelect").value;
  const comments = document.getElementById("commentsInput").value;
  const status = document.getElementById("statusSelect").value;
  clearErrors();
  let isValid = true;
  if (userName.trim() === "") {
    document.getElementById("userNameError").textContent = "Ім'я користувача є обов'язковим.";
    isValid = false;
  } else if (userName.trim().length < 3) {
    document.getElementById("userNameError").textContent = "Ім'я має бути не менше 3 символів.";
    isValid = false;
  }
  if (date === "") {
    document.getElementById("dateError").textContent = "Вкажіть дату доступу.";
    isValid = false;
  }
  if (accessType === "") {
    document.getElementById("accessTypeError").textContent = "Оберіть тип доступу.";
    isValid = false;
  }
  if (comments.trim() === "") {
    document.getElementById("commentsError").textContent = "Коментар є обов'язковим.";
    isValid = false;
  } else if (comments.trim().length < 5) {
    document.getElementById("commentsError").textContent = "Коментар має бути не менше 5 символів.";
    isValid = false;
  }
  if (status === "") {
    document.getElementById("statusError").textContent = "Оберіть статус.";
    isValid = false;
  }
  if (!isValid) return;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === editId) {
      items[i] = {
        id: items[i].id,
        userName: userName.trim(),
        date: date,
        accessType: accessType,
        comments: comments.trim(),
        status: status
      };
      break;
    }
  }
  saveToStorage();
  cancelEdit();
  form.reset();
  document.getElementById("statusSelect").value = "Pending";
  clearErrors();
  renderTable();
});
function startEdit(id) {
  let found = null;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) { found = items[i]; break; }
  }
  if (!found) return;
  editId = id;
  document.getElementById("userNameInput").value = found.userName;
  document.getElementById("dateInput").value = found.date;
  document.getElementById("accessTypeSelect").value = found.accessType;
  document.getElementById("commentsInput").value = found.comments;
  document.getElementById("statusSelect").value = found.status;
  document.getElementById("create-section").classList.add("edit-mode");
  document.getElementById("create-section").querySelector("h2").textContent = "Редагувати заявку";
  submitBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}
function cancelEdit() {
  editId = null;
  document.getElementById("create-section").classList.remove("edit-mode");
  document.getElementById("create-section").querySelector("h2").textContent = "Додати заявку";
  submitBtn.classList.remove("hidden");
  saveBtn.classList.add("hidden");
}
tbody.addEventListener("click", function (event) {
  const btn = event.target;
  if (btn.tagName !== "BUTTON") return;
  const action = btn.getAttribute("data-action");
  const id = btn.getAttribute("data-id");
  if (action === "delete") {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) { items.splice(i, 1); break; }
    }
    saveToStorage();
    renderTable();
  } else if (action === "edit") {
    startEdit(id);
  }
});
searchInput.addEventListener("input", function () {
  renderTable();
});
filterStatus.addEventListener("change", function () {
  renderTable();
});
sortOrder.addEventListener("change", function () {
  renderTable();
});
loadFromStorage();
renderTable();