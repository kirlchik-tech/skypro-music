"use client";

import Link from "next/link";
import styles from "./TrackItem.module.css";
import { Track } from "../../../../data";
import { useAppDispatch, useAppSelector } from "../../../store/store"; 
import { setCurrentTrack, setIsPlaying } from "../../../store/features/playerSlice"; 

interface TrackItemProps {
  track: Track;
  playlist: Track[]; 
}


export default function TrackItem({ track, playlist }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrent = currentTrack?._id === track._id;

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, playlist }));
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.playlist__item} onClick={handleTrackClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrent ? (
              <div className={`${styles.playingDot} ${isPlaying ? styles.playingDotActive : ""}`}></div>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className={styles.track__titleText}>
            <Link href="#" className={styles.track__titleLink}>
              {track.name}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link href="#" className={styles.track__authorLink}>
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link href="#" className={styles.track__albumLink}>
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
}