"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Playlist from "./Playlist/Playlist";
import styles from "./CenterBlock.module.css";
import { Track } from "../../data";

export default function CenterBlock() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    console.log("Выбран трек:", track.name);
  };

  return (
    <div className={styles.centerblock}>
      <SearchBar />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <Playlist onTrackSelect={handleTrackSelect} />
    </div>
  );
}