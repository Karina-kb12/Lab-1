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
        const displayName = req.user_name || `Користувач #${req.user_id}`;
        const displayDate = req.date ? new Date(req.date).toLocaleString('uk-UA') : "—";
        const displayComments = req.comments || "—";
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${displayName}</td>
            <td>${displayDate}</td>
            <td>${req.access_type}</td>
            <td>${displayComments}</td>
            <td>${req.status}</td>
            <td><button class="delete-btn" data-id="${req.id}">Видалити</button></td>
        `;
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
