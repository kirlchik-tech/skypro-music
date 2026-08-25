"use client";

import { useState, useMemo, useCallback } from "react"; 
import classNames from "classnames";
import styles from "./Filter.module.css";
import { Track } from "../../../data";

interface FilterProps {
  tracks: Track[];
  selectedAuthors: string[];
  toggleAuthor: (author: string) => void;
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export default function Filter({ 
  tracks, selectedAuthors, toggleAuthor, selectedGenres, toggleGenre, sortOrder, setSortOrder 
}: FilterProps) {
  //  здесь хранится только инфа о том, какое меню ОТКРЫТО
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const safeTracks = Array.isArray(tracks) ? tracks : [];

  const toggleDropdown = useCallback((filter: string) => {
    setActiveDropdown((prev) => (prev === filter ? null : filter));
  }, []); 

  // Списки строятся из НЕотфильтрованных треков
  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(safeTracks.map((track) => track.author).filter(Boolean)));
  }, [safeTracks]);

  const uniqueGenres = useMemo(() => {
    return Array.from(new Set(safeTracks.map((track) => track.genre).flat().filter(Boolean)));
  }, [safeTracks]);

  const yearOptions = useMemo(() => ["По умолчанию", "Сначала новые", "Сначала старые"], []);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      {/* Фильтр по ИСПОЛНИТЕЛЮ */}
      <div className={styles.filter__wrapper}>
        <button
          className={classNames(styles.filter__button, {
            [styles.active]: activeDropdown === "author",
          })}
          onClick={() => toggleDropdown("author")}
        >
          исполнителю
        </button>
        {/* Бейдж количества выбранных */}
        {selectedAuthors.length > 0 && <div className={styles.filter__badge}>{selectedAuthors.length}</div>}
        
        {activeDropdown === "author" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueAuthors.map((author, index) => (
                <li 
                  key={index} 
                  className={classNames(styles.filter__item, {
                    [styles.activeItem]: selectedAuthors.includes(author as string)
                  })}
                  onClick={() => toggleAuthor(author as string)}
                >
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
            [styles.active]: activeDropdown === "year",
          })}
          onClick={() => toggleDropdown("year")}
        >
          году выпуска
        </button>
        {activeDropdown === "year" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {yearOptions.map((year, index) => (
                <li 
                  key={index} 
                  className={classNames(styles.filter__item, {
                    [styles.activeItem]: sortOrder === year
                  })}
                  onClick={() => {
                    setSortOrder(year);
                    setActiveDropdown(null); // Закрываем при выборе
                  }}
                >
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
            [styles.active]: activeDropdown === "genre",
          })}
          onClick={() => toggleDropdown("genre")}
        >
          жанру
        </button>
        {/* Бейдж количества выбранных */}
        {selectedGenres.length > 0 && <div className={styles.filter__badge}>{selectedGenres.length}</div>}

        {activeDropdown === "genre" && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueGenres.map((genre, index) => (
                <li 
                  key={index} 
                  className={classNames(styles.filter__item, {
                    [styles.activeItem]: selectedGenres.includes(genre as string)
                  })}
                  onClick={() => toggleGenre(genre as string)}
                >
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