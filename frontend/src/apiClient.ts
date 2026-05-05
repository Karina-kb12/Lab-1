import { API_BASE_URL } from "./config.js";
import { AccessRequestDto, CreateAccessRequestDto, ApiError } from "./dtos.js";

async function request<T>(path: string, options: RequestInit = {}, timeoutMs = 10000): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        if (response.status === 204) return null as unknown as T;

        const rawText = await response.text();

        if (!response.ok) {
            let payload: any = null;
            try { payload = JSON.parse(rawText); } catch {}
            
            const err: ApiError = {
                status: response.status,
                message: payload?.title ?? payload?.message ?? "HTTP помилка",
                details: payload?.detail ?? rawText ?? `Статус: ${response.status}`
            };
            throw err;
        }

        return rawText ? JSON.parse(rawText) : (null as unknown as T);

    } catch (e: any) {
        if (e.name === "AbortError") {
            throw { status: 0, message: "Таймаут", details: "Сервер не відповів вчасно" } as ApiError;
        }
        if (e.status) throw e; 
        
        throw { 
            status: 0, 
            message: "Помилка мережі або CORS", 
            details: e?.message ?? String(e) 
        } as ApiError;
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function getRequests(): Promise<AccessRequestDto[]> {
    return await request<AccessRequestDto[]>("/access-requests");
}

export async function createRequest(dto: CreateAccessRequestDto): Promise<AccessRequestDto> {
    return await request<AccessRequestDto>("/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    });
}

export async function deleteRequest(id: number): Promise<void> {
    await request<void>(`/access-requests/${id}`, { method: "DELETE" });
}