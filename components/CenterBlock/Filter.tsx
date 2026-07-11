"use client";

import { useState } from "react";
import classNames from "classnames";
import styles from "./Filter.module.css";
import { tracksData } from "../../data";

export default function Filter() {

  const [activeFilter, setActiveFilter] = useState<string | null>(null);


  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };


  const uniqueAuthors = Array.from(new Set(tracksData.map((track) => track.author)));
  const uniqueGenres = Array.from(new Set(tracksData.flatMap((track) => track.genre)));
  const yearOptions = ["По умолчанию", "Сначала новые", "Сначала старые"];

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