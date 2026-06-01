import { refreshData } from "./ui.js";
import { createRequest } from "./apiClient.js";
import type { CreateAccessRequestDto } from "./dtos.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#createForm") as HTMLFormElement;

    refreshData();

    form?.addEventListener("submit", async (e: Event) => {
        e.preventDefault();

        const userNameInput = document.querySelector("#userNameInput") as HTMLInputElement;
        const dateInput = document.querySelector("#dateInput") as HTMLInputElement;
        const accessTypeSelect = document.querySelector("#accessTypeSelect") as HTMLSelectElement;
        const commentsInput = document.querySelector("#commentsInput") as HTMLTextAreaElement;
        const statusSelect = document.querySelector("#statusSelect") as HTMLSelectElement;

        const dto = {
            user_id: 1, 
            user_name: (document.querySelector("#userNameInput") as HTMLInputElement).value.trim(),
            date: (document.querySelector("#dateInput") as HTMLInputElement).value,
            access_type: (document.querySelector("#accessTypeSelect") as HTMLSelectElement).value,
            comments: (document.querySelector("#commentsInput") as HTMLTextAreaElement).value,
            status: (document.querySelector("#statusSelect") as HTMLSelectElement).value
        };

        if (!dto.user_name || !dto.date) {
            alert("Будь ласка, заповніть ім'я та дату!");
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