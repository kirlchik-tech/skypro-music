"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Track } from "../../data";
import { withReAuth } from "../api/withReAuth";
import { useAppDispatch } from "../store/store";
import { updateTrackLike } from "../store/features/playerSlice";

export const useLike = (track: Track | null) => {
  const [isLiked, setIsLiked] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // При загрузке проверяем, стоит ли лайк
  useEffect(() => {
    if (!track) return;
    if (pathname === "/favorites") {
      setIsLiked(true);
      return;
    }
    const username = localStorage.getItem("username");
    const hasLiked = track.stared_user?.some((user: any) => user.username === username);
    setIsLiked(!!hasLiked);
  }, [track, pathname]);

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation(); // Чтобы трек не включался при клике на сердечко
    if (!track) return;

    const trackId = track.id || (track as any)._id; 
    const username = localStorage.getItem("username") || "";
    
    // 1. ОПТИМИСТИЧНЫЙ UI: мгновенно меняем цвет сердечка
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked); 

    // 2. БЕЗОПАСНАЯ ПАМЯТЬ: Обновляем Redux (чтобы в плеере тоже поменялся цвет)
    dispatch(updateTrackLike({ trackId, isLiked: newIsLiked, username }));

    // 3. ОТПРАВКА НА СЕРВЕР
    try {
      await withReAuth(async (token) => {
        const url = `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${trackId}/favorite/`;
        const method = newIsLiked ? "POST" : "DELETE"; 

        const response = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) throw new Error("Токен устарел");
        if (!response.ok) throw new Error("Не удалось сохранить лайк");
        
        return response.json();
      });
    } catch (error: any) {
      console.error("Ошибка лайка:", error.message);
      
      // Если сервер отвалился или интернет пропал, откатываем визуал обратно
      setIsLiked(!newIsLiked);
      dispatch(updateTrackLike({ trackId, isLiked: !newIsLiked, username }));
    }
  }, [track, isLiked, dispatch]); 

  return { isLiked, handleLike };
};