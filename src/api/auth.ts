const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

// Типизация ответов
export interface AuthResponse {
  _id: number;
  username: string;
  email: string;
  message?: string; 
}

export interface TokenResponse {
  access: string;
  refresh: string;
  detail?: string;
}

// Запрос на регистрацию
export async function registerUser(email: string, password: string, username: string) {
  const response = await fetch(`${BASE_URL}/user/signup/`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.username?.[0] || data.email?.[0] || data.password?.[0] || "Ошибка регистрации");
  }

  return data;
}

//логин
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/user/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || "Ошибка авторизации");
  }

  return data;
}

//токены
export async function getToken(email: string, password: string): Promise<TokenResponse> {
  const response = await fetch(`${BASE_URL}/user/token/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || "Ошибка получения токена");
  }

  return data;
}

// Запрос на обновление токена
export async function refreshTokenAPI(): Promise<string> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("Нет refresh токена");

  const response = await fetch(`${BASE_URL}/user/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось обновить токен");
  }

  const data = await response.json();
  return data.access; // Возвращаем только новый access_token
}