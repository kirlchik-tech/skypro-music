"use client";

import Link from "next/link";
import styles from "./TrackInfo.module.css";
import { useAppSelector } from "../../store/store"; 

export default function TrackInfo() {
  // Достаем текущий трек из Redux
  const { currentTrack } = useAppSelector((state) => state.player);

  if (!currentTrack) return null;

  return (
    <div className={styles.player__trackPlay}>
      <div className={styles.trackPlay__contain}>
        <div className={styles.trackPlay__image}>
          <svg className={styles.trackPlay__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.trackPlay__author}>
          <Link href="#" className={styles.trackPlay__authorLink}>
            {currentTrack.name}
          </Link>
        </div>
        <div className={styles.trackPlay__album}>
          <Link href="#" className={styles.trackPlay__albumLink}>
            {currentTrack.author}
          </Link>
        </div>
      </div>
      
      <div className={styles.trackPlay__actions}>
        <div className={`${styles.trackPlay__like} ${styles.btnIcon}`}>
          <svg className={styles.trackPlay__likeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
        </div>
        <div className={`${styles.trackPlay__dislike} ${styles.btnIcon}`}>
          <svg className={styles.trackPlay__dislikeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}