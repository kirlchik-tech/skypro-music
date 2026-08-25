import { Track } from "../../data"; 

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";


async function syncFavorites(tracks: Track[]): Promise<Track[]> {
  if (typeof window === "undefined") return tracks;
  
  const token = localStorage.getItem("access_token");
  if (!token || !tracks.length) return tracks;
  
  try {
    const favRes = await fetch(`${BASE_URL}/catalog/track/favorite/all/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    
    if (!favRes.ok) return tracks;
    
    const favData = await favRes.json();
    const rawFavs = favData.data || favData.items || favData || [];
    const favTracks = rawFavs.map((item: Track & { track?: Track }) => item.track ? item.track : item);
    
    const username = localStorage.getItem("username") || "user";
    
    // Проходимся по всем трекам и насильно проставляем лайки, если они есть в избранном
    return tracks.map(track => {
      const trackId = track.id || track._id;
      const isFav = favTracks.some((f: Track) => (f.id || f._id) === trackId);
      
      const newTrack = { ...track, stared_user: track.stared_user ? [...track.stared_user] : [] };
      
      if (isFav) {
        if (!newTrack.stared_user.find(u => u.username === username)) {
          newTrack.stared_user.push({ id: 0, username, email: "" });
        }
      } else {
        newTrack.stared_user = newTrack.stared_user.filter(u => u.username !== username);
      }
      
      return newTrack;
    });
  } catch (e) {
    return tracks;
  }
}

// Получить все треки (с синхронизацией)
export async function getTracks(): Promise<Track[]> {
  const response = await fetch(`${BASE_URL}/catalog/track/all/`, { cache: "no-store" });
  if (!response.ok) throw new Error("Ошибка при получении треков");
  const data = await response.json();
  const tracks = data.data || data.items || data; 
  
  return await syncFavorites(tracks);
}

export interface SelectionResponse {
  items: Track[];
  name: string;
}

// Получить треки конкретной подборки по ID (с синхронизацией)
export async function getSelection(id: string): Promise<SelectionResponse> {
  const response = await fetch(`${BASE_URL}/catalog/selection/${id}/`, { cache: "no-store" });
  if (!response.ok) throw new Error("Ошибка при получении подборки");
  
  const data = await response.json();
  const selection = data.data || data; 
  const rawItems = selection.items || [];
  
  if (rawItems.length > 0 && (typeof rawItems[0] !== "object" || !rawItems[0].name)) {
    const allTracksRes = await fetch(`${BASE_URL}/catalog/track/all/`, { cache: "no-store" });
    const allTracksData = await allTracksRes.json();
    const allTracks = allTracksData.data || allTracksData.items || allTracksData || [];
    
    if (Array.isArray(allTracks)) {
      const populatedItems = rawItems.map((raw: Track | number | string) => {
        const rawId = typeof raw === "object" ? (raw.id || raw._id) : Number(raw);
        return allTracks.find((t: Track) => t.id === rawId || t._id === rawId);
      }).filter((t: Track | undefined) => t && t.name);
      
      return { 
        items: await syncFavorites(populatedItems as Track[]), 
        name: selection.name || "Подборка" 
      };
    }
  }
  
  const normalItems = rawItems.map((item: Track & { track?: Track }) => item.track ? item.track : item);
  return {
    items: await syncFavorites(normalItems), 
    name: selection.name || "Подборка", 
  };
}

// Получить избранные треки
export async function getFavoriteTracks(token: string): Promise<Track[]> {
  const response = await fetch(`${BASE_URL}/catalog/track/favorite/all/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store", 
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Токен устарел");
    throw new Error("Ошибка при получении избранного");
  }

  const data = await response.json();
  const rawItems = data.data || data.items || data || [];
  const normalizedItems = rawItems.map((item: { track?: Track } & Track) => item.track ? item.track : item);
  

  const username = typeof window !== "undefined" ? localStorage.getItem("username") || "user" : "user";
  return normalizedItems.map(track => {
    const newTrack = { ...track, stared_user: track.stared_user ? [...track.stared_user] : [] };
    if (!newTrack.stared_user.find(u => u.username === username)) {
      newTrack.stared_user.push({ id: 0, username, email: "" });
    }
    return newTrack;
  });
}