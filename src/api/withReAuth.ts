import { refreshTokenAPI } from "./auth";

// Обертка для авторизованных запросов
export async function withReAuth<T>(apiCall: (token: string) => Promise<T>): Promise<T> {
  let token = localStorage.getItem("access_token");
  
  if (!token) {
    window.location.href = "/auth/signin";
    throw new Error("Не авторизован");
  }

  try {
    // Пытаемся выполнить оригинальный запрос
    return await apiCall(token);
  } catch (error: any) {
    // Если ошибка 401 (Токен устарел), запускаем процесс обновления
    if (error.message === "Токен устарел" || error.status === 401) {
      try {
        const newToken = await refreshTokenAPI();
        
        // Сохраняем новый токен
        localStorage.setItem("access_token", newToken);
        
        // ПОВТОРЯЕМ исходный запрос уже с новым токеном!
        return await apiCall(newToken);
      } catch (refreshError) {
        // Если refresh-токен тоже протух, полностью очищаем сессию
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        window.location.href = "/auth/signin";
        throw new Error("Требуется повторная авторизация");
      }
    }
    
    // Если ошибка не связана с токеном, прокидываем её дальше
    throw error;
  }
}