import { refreshData, applyFiltersAndRender } from "./ui.js";
import { createRequest } from "./apiClient.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#createForm");
    refreshData();
    const searchInput = document.querySelector("#searchInput");
    const filterStatus = document.querySelector("#filterStatus");
    const sortOrder = document.querySelector("#sortOrder");
    searchInput?.addEventListener("input", () => applyFiltersAndRender());
    filterStatus?.addEventListener("change", () => applyFiltersAndRender());
    sortOrder?.addEventListener("change", () => applyFiltersAndRender());
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userNameInput = document.querySelector("#userNameInput");
        const dateInput = document.querySelector("#dateInput");
        const accessTypeSelect = document.querySelector("#accessTypeSelect");
        const commentsInput = document.querySelector("#commentsInput");
        const statusSelect = document.querySelector("#statusSelect");
        const dto = {
            userId: 0,
            userName: userNameInput.value.trim(),
            date: dateInput.value,
            accessType: accessTypeSelect.value,
            status: statusSelect.value,
            comments: commentsInput.value.trim()
        };
        if (!dto.userName || !dto.date || !dto.accessType || !dto.comments || !dto.status) {
            alert("Будь ласка, заповніть абсолютно всі поля!");
            return;
        }
        try {
            await createRequest(dto);
            form.reset();
            await refreshData();
            alert("Заявку успішно створено!");
        }
        catch (err) {
            console.error("Помилка:", err);
            alert(`Не вдалося створити заявку: ${err.message}`);
        }
    });
    const resetBtn = document.querySelector("#resetBtn");
    resetBtn?.addEventListener("click", () => {
        form.reset();
    });
});
