"use client";

import TrackItem from "./TrackItem";
import TrackItemSkeleton from "./TrackItemSkeleton"; 
import PlaylistHeader from "./PlaylistHeader";
import styles from "./Playlist.module.css";
import { Track } from "../../../../data";

interface PlaylistProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
}

export default function Playlist({ tracks, isLoading, error }: PlaylistProps) {
  // Создаем массив из 7 пустых элементов для рендера скелетонов
  const skeletons = Array.from({ length: 7 });

  return (
    <div className={styles.content__playlist}>
      <PlaylistHeader />

      <div className={styles.playlist__container}>
        {isLoading && skeletons.map((_, index) => (
          <TrackItemSkeleton key={index} />
        ))}

        {/* Ошибки */}
        {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}

        {/* ЕСЛИ ТРЕКИ НЕ НАЙДЕНЫ */}
        {!isLoading && !error && Array.isArray(tracks) && tracks.length === 0 && (
          <div style={{ color: "#909090", marginTop: "40px", fontSize: "24px", textAlign: "center" }}>
            Нет подходящих треков
          </div>
        )}

        {/* ЕСЛИ ЗАГРУЗКА ЗАКОНЧИЛАСЬ И ЕСТЬ ТРЕКИ — ПОКАЗЫВАЕМ ИХ */}
        {!isLoading && !error && Array.isArray(tracks) && tracks.map((track, index) => (
          <TrackItem
            key={track.id || track._id || index}
            track={track}
            playlist={tracks}
          />
        ))}
      </div>
    </div>
  );
}