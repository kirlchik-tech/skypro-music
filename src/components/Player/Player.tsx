"use client";

import { useRef, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import TrackInfo from "./TrackInfo";
import VolumeControl from "./VolumeControl";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Player.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setIsPlaying, nextTrack } from "../../store/features/playerSlice";

// Хелпер для красивого форматирования времени (например, 03:05)
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function Player() {
  const { currentTrack, isPlaying, isLooped } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Локальные стейты для плеера
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // Воспроизведение при смене трека
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  }, [currentTrack, dispatch]);

  // Применение громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  // Перемотка трека по клику на прогресс-бар
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  const handleEnded = () => {
    dispatch(nextTrack());
  };

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        

        <audio 
          ref={audioRef} 
          src={currentTrack.track_file} 
          loop={isLooped} 
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={handleEnded}
        />


        <div style={{ color: '#696969', fontSize: '14px', display: 'flex', justifyContent: 'flex-end', paddingRight: '15px' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>


        <ProgressBar 
          max={duration} 
          value={currentTime} 
          step={0.01} 
          onChange={handleSeek} 
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <PlayerControls togglePlay={togglePlay} />
            <TrackInfo />
          </div>
          <div className={styles.bar__volumeBlock}>
            <VolumeControl volume={volume} setVolume={setVolume} />
          </div>
        </div>
      </div>
    </div>
  );
}