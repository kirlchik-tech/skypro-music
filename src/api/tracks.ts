import { Track } from "../../data"; 

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

// Получить все треки
export async function getTracks(): Promise<Track[]> {
  const response = await fetch(`${BASE_URL}/catalog/track/all/`);
  if (!response.ok) throw new Error("Ошибка при получении треков");
  const data = await response.json();

  return data.data || data.items || data; 
}

// Типизация для ответа подборки
export interface SelectionResponse {
  items: Track[];
  name: string;
}

// Получить треки конкретной подборки по ID
export async function getSelection(id: string): Promise<SelectionResponse> {
  const response = await fetch(`${BASE_URL}/catalog/selection/${id}/`);
  if (!response.ok) throw new Error("Ошибка при получении подборки");
  
  const data = await response.json();
  const selection = data.data || data; 
  const rawItems = selection.items || [];
  

  if (rawItems.length > 0 && !rawItems[0].name) {
    // Значит, сервер прислал обрубки. Качаем весь список треков!
    const allTracksRes = await fetch(`${BASE_URL}/catalog/track/all/`);
    const allTracksData = await allTracksRes.json();
    const allTracks = allTracksData.data || allTracksData.items || allTracksData || [];
    
    if (Array.isArray(allTracks)) {
      // Сопоставляем каждый обрубок с полноценным треком из базы
      const populatedItems = rawItems.map((raw: Track) => {
    const rawId = raw?.id || raw?._id;
    return allTracks.find((t: Track) => t.id === rawId || t._id === rawId);
  }).filter((t: Track | undefined) => t && t.name);
      
      return {
    items: rawItems.map((item: Track & { track?: Track }) => item.track ? item.track : item), 
    name: selection.name || "Подборка", 
  };
    }
  }
  
  // Если сервер прислал нормальные объекты (или обернутые в свойство track)
  return {
    items: rawItems.map((item: Track & { track?: Track }) => item.track ? item.track : item), 
    name: selection.name || "Подборка", 
  };
}
// Получить избранные треки
export async function getFavoriteTracks(token: string): Promise<Track[]> {
  const response = await fetch(`${BASE_URL}/catalog/track/favorite/all/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Токен устарел");
    }
    throw new Error("Ошибка при получении избранного");
  }

  const data = await response.json();
  
  // API может прислать массив напрямую или обернуть в data
  const rawItems = data.data || data.items || data || [];
  
  // Распаковываем треки (как мы делали это для подборок)
  const normalizedItems = rawItems.map((item: { track?: Track } & Track) => item.track ? item.track : item);
  
  return normalizedItems;
}