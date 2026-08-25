"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Track } from "../../data";
import { withReAuth } from "../api/withReAuth";
import { useAppDispatch } from "../store/store";
import { updateTrackLike } from "../store/features/playerSlice";

export const useLike = (track: Track | null) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  // При загрузке честно проверяем, есть ли наш ник в массиве лайкнувших
  useEffect(() => {
    if (!track) return;
    const username = localStorage.getItem("username");
    const hasLiked = track.stared_user?.some((user) => user.username === username);
    setIsLiked(!!hasLiked);
  }, [track]); // <-- Убрали зависимость от pathname

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!track) return;

    const username = localStorage.getItem("username");
    if (!username) {
      toast.warn("Войдите в аккаунт, чтобы ставить лайки! 🔒"); 
      return;
    }

    const trackId = track.id || track._id; 
    const newIsLiked = !isLiked;
    
    setIsLiked(newIsLiked); 
    dispatch(updateTrackLike({ trackId, isLiked: newIsLiked, username }));

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
        
        if (newIsLiked) {
          toast.success("Добавлено в избранное 💜", { icon: "🔥", autoClose: 1500 });
        } else {
          toast.info("Удалено из избранного 💔", { autoClose: 1500 });
        }

        return response.json();
      });
    } catch (error: unknown) {
      const err = error as Error; 
      toast.error(`Ошибка: ${err.message}`);
      
      setIsLiked(!newIsLiked);
      dispatch(updateTrackLike({ trackId, isLiked: !newIsLiked, username }));
    }
  }, [track, isLiked, dispatch]); 

  return { isLiked, handleLike };
};