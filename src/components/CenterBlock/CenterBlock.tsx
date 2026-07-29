"use client";

import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Playlist from "./Playlist/Playlist";
import styles from "./CenterBlock.module.css";
import { Track } from "../../../data"; 

interface CenterBlockProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  title: string;
}

export default function CenterBlock({ tracks, isLoading, error, title }: CenterBlockProps) {
  return (
    <div className={styles.centerblock}>
      <SearchBar />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      
      <Filter tracks={tracks} />
      
      <Playlist tracks={tracks} isLoading={isLoading} error={error} />
    </div>
  );
}