import styles from "./VolumeControl.module.css";

interface VolumeControlProps {
  volume: number;
  setVolume: (val: number) => void;
}

export default function VolumeControl({ volume, setVolume }: VolumeControlProps) {
  return (
    <div className={styles.volume__content}>
      <div className={styles.volume__image}>
        <svg className={styles.volume__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
        </svg>
      </div>
      <div className={styles.volume__progress}>
        <input
          className={styles.volume__progressLine}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}