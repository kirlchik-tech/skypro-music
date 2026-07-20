import classNames from "classnames";
import styles from "./PlayerControls.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { nextTrack, prevTrack, toggleLoop, toggleShuffle } from "../../store/features/playerSlice";

interface PlayerControlsProps {
  togglePlay: () => void;
}

export default function PlayerControls({ togglePlay }: PlayerControlsProps) {
  const { isPlaying, isLooped, isShuffled } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.player__controls}>
      <div className={styles.player__btnPrev} onClick={() => dispatch(prevTrack())}>
        <svg className={styles.player__btnPrevSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
        </svg>
      </div>
      
      <div className={`${styles.player__btnPlay} ${styles.btn}`} onClick={togglePlay}>
        <svg className={styles.player__btnPlaySvg}>
          <use xlinkHref={isPlaying ? "/img/icon/sprite.svg#icon-pause" : "/img/icon/sprite.svg#icon-play"}></use>
        </svg>
      </div>
      
      <div className={styles.player__btnNext} onClick={() => dispatch(nextTrack())}>
        <svg className={styles.player__btnNextSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
        </svg>
      </div>

      {/* Кнопка Loop */}
      <div 
        className={classNames(styles.player__btnRepeat, styles.btnIcon, { [styles.active]: isLooped })} 
        onClick={() => dispatch(toggleLoop())}
      >
        <svg className={styles.player__btnRepeatSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
        </svg>
      </div>

      {/* Кнопка Shuffle */}
      <div 
        className={classNames(styles.player__btnShuffle, styles.btnIcon, { [styles.active]: isShuffled })} 
        onClick={() => dispatch(toggleShuffle())}
      >
        <svg className={styles.player__btnShuffleSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
        </svg>
      </div>
    </div>
  );
}