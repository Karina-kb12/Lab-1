import { API_BASE_URL } from "./config.js";
import { AccessRequestDto, CreateAccessRequestDto, ApiError } from "./dtos.js";

async function request<T>(path: string, options: RequestInit = {}, timeoutMs = 10000): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
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

        if (response.status === 204) return null as unknown as T;

        const rawText = await response.text();

        if (!response.ok) {
            let payload: any = null;
            try { payload = JSON.parse(rawText); } catch {}
            
            const err: ApiError = {
                code: response.status,
                message: payload?.message ?? payload?.title ?? "HTTP помилка"
            };
            throw err;
        }

        return rawText ? JSON.parse(rawText) : (null as unknown as T);

    } catch (e: any) {
        if (e.name === "AbortError") {
            throw { code: 0, message: "Таймаут", details: "Сервер не відповів вчасно" } as ApiError;
        }
        if (e.code) throw e; 
        
        throw { 
            code: 0, 
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
        body: JSON.stringify(dto)
    });
}

export async function deleteRequest(id: number): Promise<void> {
    return await request<void>(`/access-requests/${id}`, { method: "DELETE" });
}