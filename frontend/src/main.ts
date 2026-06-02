import { refreshData, applyFiltersAndRender } from "./ui.js";
import { createRequest } from "./apiClient.js";
import type { CreateAccessRequestDto } from "./dtos.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#createForm") as HTMLFormElement;

    refreshData();

    const searchInput = document.querySelector("#searchInput");
    const filterStatus = document.querySelector("#filterStatus");
    const sortOrder = document.querySelector("#sortOrder");

    searchInput?.addEventListener("input", () => applyFiltersAndRender());
    filterStatus?.addEventListener("change", () => applyFiltersAndRender());
    sortOrder?.addEventListener("change", () => applyFiltersAndRender());

    form?.addEventListener("submit", async (e: Event) => {
        e.preventDefault();

        const userNameInput = document.querySelector("#userNameInput") as HTMLInputElement;
        const dateInput = document.querySelector("#dateInput") as HTMLInputElement;
        const accessTypeSelect = document.querySelector("#accessTypeSelect") as HTMLSelectElement;
        const commentsInput = document.querySelector("#commentsInput") as HTMLTextAreaElement;
        const statusSelect = document.querySelector("#statusSelect") as HTMLSelectElement;

        const dto: CreateAccessRequestDto = {
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
        } catch (err: any) {
            console.error("Помилка:", err);
            alert(`Не вдалося створити заявку: ${err.message}`);
        }
    });

    const resetBtn = document.querySelector("#resetBtn");
    resetBtn?.addEventListener("click", () => {
        form.reset();
    });
});