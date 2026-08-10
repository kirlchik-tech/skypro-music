"use client";

import Link from "next/link";
import { useCallback } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import styles from "./TrackItem.module.css";
import { Track } from "../../../../data";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setCurrentTrack } from "../../../store/features/playerSlice";
import { useLike } from "../../../hooks/useLike";

interface TrackItemProps {
  track: Track;
  playlist: Track[];
}

export default function TrackItem({ track, playlist }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);

  const trackId = track.id || (track as any)._id;
  const currentTrackId = currentTrack?.id || (currentTrack as any)?._id;
  const isCurrent = currentTrackId && trackId ? currentTrackId === trackId : false;

  const { isLiked, handleLike } = useLike(track);

  const handleTrackClick = useCallback(() => {
    dispatch(setCurrentTrack({ track, playlist }));
  }, [dispatch, track, playlist]);

  const formatDuration = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Если мы в избранном и сняли лайк — прячем трек
  if (pathname === "/favorites" && !isLiked) {
    return null;
  }

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
          <div 
            onClick={handleLike} 
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <svg 
              className={classNames(styles.track__timeSvg, { 
                [styles.liked]: isLiked 
              })}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            </svg>
          </div>
          <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
}