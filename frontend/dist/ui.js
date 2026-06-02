import { getRequests, deleteRequest } from "./apiClient.js";
const table = document.querySelector("#itemsTable");
const tableBody = document.querySelector("#itemsTableBody");
const emptyState = document.querySelector("#emptyState");
let allRequests = [];
const statusTranslations = {
    "Pending": "В очікуванні",
    "Approved": "Схвалено",
    "Rejected": "Відхилено",
    "В очікуванні": "В очікуванні",
    "Схвалено": "Схвалено",
    "Відхилено": "Відхилено"
};
const accessTypeTranslations = {
    "Temporary": "Тимчасовий",
    "Permanent": "Постійний",
    "Guest": "Гостьовий",
    "Тимчасовий": "Тимчасовий",
    "Постійний": "Постійний",
    "Гостьовий": "Гостьовий"
};
export function applyFiltersAndRender() {
    const searchInput = document.querySelector("#searchInput");
    const filterStatus = document.querySelector("#filterStatus");
    const sortOrder = document.querySelector("#sortOrder");
    let filtered = [...allRequests];
    if (searchInput && searchInput.value.trim() !== "") {
        const query = searchInput.value.toLowerCase().trim();
        filtered = filtered.filter(req => req.userName?.toLowerCase().includes(query));
    }
    if (filterStatus && filterStatus.value !== "") {
        filtered = filtered.filter(req => req.status === filterStatus.value);
    }
    if (sortOrder && sortOrder.value !== "") {
        filtered.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder.value === "date-asc" ? dateA - dateB : dateB - dateA;
        });
    }
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    if (filtered.length === 0) {
        table.classList.add("hidden");
        emptyState.classList.remove("hidden");
        return;
    }
    table.classList.remove("hidden");
    emptyState.classList.add("hidden");
    filtered.forEach(req => {
        const row = document.createElement("tr");
        const displayName = req.userName || `Користувач #${req.id}`;
        const displayDate = req.date ? new Date(req.date).toLocaleString('uk-UA') : "—";
        const displayComments = req.comments || "—";
        const displayType = accessTypeTranslations[req.accessType] || req.accessType;
        const displayStatus = statusTranslations[req.status] || req.status;
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdType = document.createElement("td");
        const tdComments = document.createElement("td");
        const tdStatus = document.createElement("td");
        const tdAction = document.createElement("td");
        tdId.textContent = String(req.id);
        tdName.textContent = displayName;
        tdDate.textContent = displayDate;
        tdType.textContent = displayType;
        tdComments.textContent = displayComments;
        tdStatus.textContent = displayStatus;
        const btn = document.createElement("button");
        btn.className = "delete-btn";
        btn.textContent = "Видалити";
        btn.setAttribute("data-id", String(req.id));
        tdAction.appendChild(btn);
        row.appendChild(tdId);
        row.appendChild(tdName);
        row.appendChild(tdDate);
        row.appendChild(tdType);
        row.appendChild(tdComments);
        row.appendChild(tdStatus);
        row.appendChild(tdAction);
        tableBody.appendChild(row);
    });
}
export async function refreshData() {
    try {
        allRequests = await getRequests();
        applyFiltersAndRender();
    }
    catch (err) {
        console.error("Помилка завантаження:", err);
        alert("Не вдалося оновити дані");
    }
}
tableBody?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.dataset.id);
        if (confirm(`Видалити заявку №${id}?`)) {
            try {
                await deleteRequest(id);
                await refreshData();
            }
            catch (err) {
                alert(`Не вдалося видалити: ${err.message}`);
            }
        }
    }
});
