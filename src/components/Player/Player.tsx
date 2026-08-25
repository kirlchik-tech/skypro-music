"use client";

import { useRef, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import TrackInfo from "./TrackInfo";
import VolumeControl from "./VolumeControl";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Player.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setIsPlaying, nextTrack } from "../../store/features/playerSlice";
import { formatDuration } from "../../utils/formatters"; 


export default function Player() {
  const { currentTrack, isPlaying, isLooped } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Локальные стейты для плеера
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);



  // Применение громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
//авто-воспроизведение при смене трека
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            dispatch(setIsPlaying(true));
          })
          .catch((error) => {
            console.log("Воспроизведение прервано React-рендером (это безопасно):", error);
          });
      }
    }
  }, [currentTrack, dispatch]);

  // 2. Обновляем ручной клик по кнопке Play
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              dispatch(setIsPlaying(true));
            })
            .catch(console.error);
        }
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
          {formatDuration(currentTime)} / {formatDuration(duration)}
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