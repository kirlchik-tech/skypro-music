"use client";

import TrackItem from "./TrackItem";
import PlaylistHeader from "./PlaylistHeader";
import styles from "./Playlist.module.css";
import { Track } from "../../../../data"; 

interface PlaylistProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
}

export default function Playlist({ tracks, isLoading, error }: PlaylistProps) {
  return (
    <div className={styles.centerblock__content}>
      <PlaylistHeader />
      <div className={styles.content__playlist}>
        
        {isLoading && <div style={{ color: "#ffffff", marginTop: "20px" }}>Загрузка треков...</div>}
        {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
        
        {!isLoading && !error && Array.isArray(tracks) && tracks.map((track, index) => (
          <TrackItem
            key={track.id || (track as any)._id || index} 
            track={track}
            playlist={tracks}
          />
        ))}

      </div>
    </div>
  );
}