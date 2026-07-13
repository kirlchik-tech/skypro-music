"use client";

import { useState } from "react";
import TrackItem from "./TrackItem";
import PlaylistHeader from "./PlaylistHeader";
import styles from "./Playlist.module.css";
import { tracksData, Track } from "../../../data";

export default function Playlist() {
  const [tracks] = useState<Track[]>(tracksData);

  return (
    <div className={styles.centerblock__content}>
      <PlaylistHeader />
      <div className={styles.content__playlist}>
        {tracks.map((track) => (
          <TrackItem 
            key={track._id} 
            track={track} 
          />
        ))}
      </div>
    </div>
  );
}