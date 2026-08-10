"use client";

import { useState, useMemo, useCallback } from "react"; 
import classNames from "classnames";
import styles from "./Filter.module.css";
import { Track } from "../../../data";

interface FilterProps {
  tracks: Track[];
}

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const safeTracks = Array.isArray(tracks) ? tracks : [];

  const toggleFilter = useCallback((filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }, []); 

  // Они пересчитаются если изменится safeTracks
  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(safeTracks.map((track) => track.author)));
  }, [safeTracks]);

  const uniqueGenres = useMemo(() => {
    return Array.from(new Set(safeTracks.map((track) => track.genre)));
  }, [safeTracks]);

  // Статичный массив тоже можно обернуть, чтобы он не создавался заново
  const yearOptions = useMemo(() => ["По умолчанию", "Сначала новые", "Сначала старые"]   , []);
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      {/* Фильтр по ИСПОЛНИТЕЛЮ */}
      <div className={styles.filter__wrapper}>
        <button
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === "author",
          })}
          onClick={() => toggleFilter("author")}
        >
          исполнителю
        </button>
        {activeFilter === "author" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueAuthors.map((author, index) => (
                <li key={index} className={styles.filter__item}>
                  {author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Фильтр по ГОДУ */}
      <div className={styles.filter__wrapper}>
        <button
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === "year",
          })}
          onClick={() => toggleFilter("year")}
        >
          году выпуска
        </button>
        {activeFilter === "year" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {yearOptions.map((year, index) => (
                <li key={index} className={styles.filter__item}>
                  {year}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Фильтр по ЖАНРУ */}
      <div className={styles.filter__wrapper}>
        <button
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === "genre",
          })}
          onClick={() => toggleFilter("genre")}
        >
          жанру
        </button>
        {activeFilter === "genre" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueGenres.map((genre, index) => (
                <li key={index} className={styles.filter__item}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}