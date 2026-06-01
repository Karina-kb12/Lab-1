import { API_BASE_URL } from "./config.js";
async function request(path, options = {}, timeoutMs = 10000) {
    const url = `${API_BASE_URL}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        if (response.status === 204)
            return null;
        const rawText = await response.text();
        if (!response.ok) {
            let payload = null;
            try {
                payload = JSON.parse(rawText);
            }
            catch { }
            const err = {
                status: response.status,
                message: payload?.title ?? payload?.message ?? "HTTP помилка",
                details: payload?.detail ?? rawText ?? `Статус: ${response.status}`
            };
            throw err;
        }
        return rawText ? JSON.parse(rawText) : null;
    }
    catch (e) {
        if (e.name === "AbortError") {
            throw { status: 0, message: "Таймаут", details: "Сервер не відповів вчасно" };
        }
        if (e.status)
            throw e;
        throw {
            status: 0,
            message: "Помилка мережі або CORS",
            details: e?.message ?? String(e)
        };
    }
    finally {
        clearTimeout(timeoutId);
    }
}
export async function getRequests() {
    return await request("/access-requests");
}
export async function createRequest(dto) {
    return await request("/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    });
}
export async function deleteRequest(id) {
    await request(`/access-requests/${id}`, { method: "DELETE" });
}
