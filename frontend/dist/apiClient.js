import { API_BASE_URL } from "./config.js";
async function request(path, options = {}, timeoutMs = 10000) {
    const url = `${API_BASE_URL}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        "Content-Type": "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    try {
        const response = await fetch(url, {
            ...options,
            headers,
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
                code: response.status,
                message: payload?.message ?? payload?.title ?? "HTTP помилка"
            };
            throw err;
        }
        return rawText ? JSON.parse(rawText) : null;
    }
    catch (e) {
        if (e.name === "AbortError") {
            throw { code: 0, message: "Таймаут", details: "Сервер не відповів вчасно" };
        }
        if (e.code)
            throw e;
        throw {
            code: 0,
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
        body: JSON.stringify(dto)
    });
}
export async function deleteRequest(id) {
    return await request(`/access-requests/${id}`, { method: "DELETE" });
}
