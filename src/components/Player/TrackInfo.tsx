"use client";

import Link from "next/link";
import classNames from "classnames";
import styles from "./TrackInfo.module.css";
import { useAppSelector } from "../../store/store";
import { useLike } from "../../hooks/useLike"; 

export default function TrackInfo() {
  const currentTrack = useAppSelector((state) => state.player.currentTrack);
  
  // Передаем текущий трек в хук
  const { isLiked, handleLike } = useLike(currentTrack);

  if (!currentTrack) return null;

  return (
    <div className={styles.trackPlay}>
      <div className={styles.trackPlay__contain}>
        <div className={styles.trackPlay__image}>
          <svg className={styles.trackPlay__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.trackPlay__author}>
          <Link className={styles.trackPlay__authorLink} href="#">
            {currentTrack.name}
          </Link>
        </div>
        <div className={styles.trackPlay__album}>
          <Link className={styles.trackPlay__albumLink} href="#">
            {currentTrack.author}
          </Link>
        </div>
      </div>

      <div className={styles.trackPlay__likeDis}>
        <div 
          className={classNames(styles.trackPlay__like, { [styles.liked]: isLiked })} 
          onClick={handleLike}
        >
          <svg className={styles.trackPlay__likeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}