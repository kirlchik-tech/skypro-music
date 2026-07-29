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

  if (rawItems.length > 0 && typeof rawItems[0] !== 'object') {
    // Качаем все треки из базы
    const allTracksResponse = await fetch(`${BASE_URL}/catalog/track/all/`);
    const allTracksData = await allTracksResponse.json();
    const allTracks = allTracksData.data || allTracksData.items || allTracksData;   
    // Оставляем только те треки, ID которых есть в нашей подборке
    const populatedItems = allTracks.filter((track: any) => 
      rawItems.includes(track.id) || rawItems.includes(track._id)
    );
    
    return {
      items: populatedItems,
      name: selection.name || "Подборка",
    };
  }
  const normalizedItems = rawItems.map((item: any) => item.track ? item.track : item);
  
  return {
    items: normalizedItems, 
    name: selection.name || "Подборка", 
  };
}