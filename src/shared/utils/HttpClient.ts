import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/common.ts";

export default class HttpClient {

    private static baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://your-api.com";
    private static tokenKey = LOCAL_STORAGE_TOKEN_KEY;

    // Optional: hook for when refresh fails (logout + redirect)
    private static onUnauthorized?: () => void;
    static setUnauthorizedHandler(handler: () => void) {
        this.onUnauthorized = handler;
    }

    private static refreshInFlight: Promise<boolean> | null = null;


    static get<T>(endpoint: string, headers?: HeadersInit) {
        return this.core<T>("GET", endpoint, undefined, headers);
    }
    static post<T>(endpoint: string, body?: unknown, headers?: HeadersInit) {
        return this.core<T>("POST", endpoint, body, headers);
    }
    static put<T>(endpoint: string, body?: unknown, headers?: HeadersInit) {
        return this.core<T>("PUT", endpoint, body, headers);
    }
    static delete<T>(endpoint: string, headers?: HeadersInit) {
        return this.core<T>("DELETE", endpoint, undefined, headers);
    }

    // --- core request with 401 -> refresh -> retry once ---
    private static async core<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        endpoint: string,
        body?: unknown,
        extraHeaders?: HeadersInit,
        alreadyRetried = false
    ): Promise<T> {
        const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
        const token = localStorage.getItem(this.tokenKey);

        const headers: HeadersInit = {
            ...(isFormData ? { "Content-Type": "multipart/form-data"} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...extraHeaders,
        };

        let requestBody: BodyInit | undefined;
        if (isFormData) {
            requestBody = body;
        } else if (body !== undefined) {
            requestBody = JSON.stringify(body);
        }

        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            body: requestBody,
            credentials: "include",
        });

        if (res.status === 401 && !alreadyRetried) {
            // Try refresh once, then retry original request
            const refreshed = await this.tryRefreshToken();
            if (refreshed) {
                return this.core<T>(method, endpoint, body, extraHeaders, true);
            }
            // Refresh failed, notify onUnauthorized function that calls logout from AuthProvider
            this.onUnauthorized?.();
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`API ${res.status}: ${res.statusText}${text ? ` - ${text}` : ""}`);
        }

        if (res.status === 204) return undefined as T;
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
            return (await res.text()) as unknown as T;
        }
        return res.json() as Promise<T>;
    }

    // refresh logic
    private static async tryRefreshToken(): Promise<boolean> {
        this.refreshInFlight ??= (async () => {
            const res = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: "POST",
                credentials: "include", // send refresh cookie
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                return false;
            }
            // Expect { token: string } or similar
            const data = await res.json().catch(() => null as never);
            const newToken: string | undefined = data?.token;
            if (!newToken) return false;
            localStorage.setItem(this.tokenKey, newToken);
            return true;
        })().finally(() => {
            this.refreshInFlight = null;
        });
        return this.refreshInFlight;
    }

    // Optional helpers to tweak config at runtime
    static setBaseUrl(url: string) {
        this.baseUrl = url;
    }
    static setTokenKey(key: string) {
        this.tokenKey = key;
    }
}
