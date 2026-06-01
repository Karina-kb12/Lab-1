import { refreshData } from "./ui.js";
import { createRequest } from "./apiClient.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#createForm");
    refreshData();
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userNameInput = document.querySelector("#userNameInput");
        const dateInput = document.querySelector("#dateInput");
        const accessTypeSelect = document.querySelector("#accessTypeSelect");
        const commentsInput = document.querySelector("#commentsInput");
        const statusSelect = document.querySelector("#statusSelect");
        const dto = {
            userId: 0, // Додаємо заглушку для TypeScript, бекенд її ігнорує
            userName: document.querySelector("#userNameInput").value.trim(),
            date: document.querySelector("#dateInput").value,
            accessType: document.querySelector("#accessTypeSelect").value,
            comments: document.querySelector("#commentsInput").value,
            status: document.querySelector("#statusSelect").value
        };
        if (!dto.userName || !dto.date) {
            alert("Будь ласка, заповніть ім'я та дату!");
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
