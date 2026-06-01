import { getRequests, deleteRequest } from "./apiClient.js";
const table = document.querySelector("#itemsTable");
const tableBody = document.querySelector("#itemsTableBody");
const emptyState = document.querySelector("#emptyState");
export function renderRequests(requests) {
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    if (requests.length === 0) {
        table.classList.add("hidden");
        emptyState.classList.remove("hidden");
        return;
    }
    table.classList.remove("hidden");
    emptyState.classList.add("hidden");
    requests.forEach(req => {
        const row = document.createElement("tr");
        const displayName = req.userName || `Користувач #${req.id}`;
        const displayDate = req.date ? new Date(req.date).toLocaleString('uk-UA') : "—";
        const displayComments = req.comments || "—";
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
        tdType.textContent = req.accessType;
        tdComments.textContent = displayComments;
        tdStatus.textContent = req.status;
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
        const data = await getRequests();
        renderRequests(data);
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
