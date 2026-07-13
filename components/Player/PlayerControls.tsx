"use client";

import styles from "./PlayerControls.module.css";
import { useAppSelector } from "../store/store"; 

// Указываем, что компонент ждет функцию togglePlay
interface PlayerControlsProps {
  togglePlay: () => void;
}

export default function PlayerControls({ togglePlay }: PlayerControlsProps) {
  // Достаем статус воспроизведения из Redux
  const { isPlaying } = useAppSelector((state) => state.player);

  return (
    <div className={styles.player__controls}>
      <div className={styles.player__btnPrev}>
        <svg className={styles.player__btnPrevSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
        </svg>
      </div>
      
      {/* Вешаем клик и меняем иконку Play/Pause */}
      <div className={`${styles.player__btnPlay} ${styles.btn}`} onClick={togglePlay}>
        <svg className={styles.player__btnPlaySvg}>
          {isPlaying ? (
            <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
          ) : (
            <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
          )}
        </svg>
      </div>
      
      <div className={styles.player__btnNext}>
        <svg className={styles.player__btnNextSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
        </svg>
      </div>
      <div className={`${styles.player__btnRepeat} ${styles.btnIcon}`}>
        <svg className={styles.player__btnRepeatSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
        </svg>
      </div>
      <div className={`${styles.player__btnShuffle} ${styles.btnIcon}`}>
        <svg className={styles.player__btnShuffleSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
        </svg>
      </div>
    </div>
  );
}