"use client";

import { useState } from "react";
import TrackItem from "./TrackItem";
import PlaylistHeader from "./PlaylistHeader";
import styles from "./Playlist.module.css";
import { tracksData, Track } from "../../../data";

interface PlaylistProps {
  onTrackSelect?: (track: Track) => void;
}

export default function Playlist({ onTrackSelect }: PlaylistProps) {
  const [tracks] = useState<Track[]>(tracksData);

  return (
    <div className={styles.centerblock__content}>
      <PlaylistHeader />
      <div className={styles.content__playlist}>
        {tracks.map((track) => (
          <TrackItem 
            key={track._id} 
            track={track} 
            onTrackClick={onTrackSelect}
          />
        ))}
      </div>
    </div>
  );
}