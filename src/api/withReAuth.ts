import { refreshTokenAPI } from "./auth";

// Обертка для авторизованных запросов
export async function withReAuth<T>(apiCall: (token: string) => Promise<T>): Promise<T> {
  let token = localStorage.getItem("access_token");
  
  if (!token) {
    window.location.href = "/auth/signin";
    throw new Error("Не авторизован");
  }

  try {
    return await apiCall(token);
  } catch (error: unknown) { 
    // Создаем типизированную копию ошибки
    const err = error as Error & { status?: number };
    
    if (err.message === "Токен устарел" || err.status === 401) {
      try {
        const newToken = await refreshTokenAPI();
        localStorage.setItem("access_token", newToken);
        return await apiCall(newToken);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        window.location.href = "/auth/signin";
        throw new Error("Требуется повторная авторизация");
      }
    }
    
    throw error;
  }
}