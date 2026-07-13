"use client";

import { useRef, useEffect } from "react";
import PlayerControls from "./PlayerControls";
import TrackInfo from "./TrackInfo";
import VolumeControl from "./VolumeControl";
import styles from "./Player.module.css";
import { useAppDispatch, useAppSelector } from "../store/store"; 
import { setIsPlaying } from "../store/features/playerSlice"; 

export default function Player() {
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Как только currentTrack меняется — запускаем музыку
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  }, [currentTrack, dispatch]);

  // Функция для паузы/воспроизведения
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  };


  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        

        <audio ref={audioRef} src={currentTrack.track_file} loop />

        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <PlayerControls togglePlay={togglePlay} />
            <TrackInfo />
          </div>
          <div className={styles.bar__volumeBlock}>
            <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  );
}
