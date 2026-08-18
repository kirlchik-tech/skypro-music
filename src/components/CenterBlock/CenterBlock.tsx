"use client";

import { useState, useMemo } from "react";
import SearchBar from "./SearchBar"; 
import Filter from "./Filter"; 
import Playlist from "./Playlist/Playlist";
import styles from "./CenterBlock.module.css";
import { Track } from "../../../data";

interface CenterBlockProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  title: string;
}

export default function CenterBlock({ tracks, isLoading, error, title }: CenterBlockProps) {
  // Стейты фильтров (автоматически сбросятся при переходе на другую страницу)
  const [searchValue, setSearchValue] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("По умолчанию");

  // Функции для добавления/удаления фильтров (можно выбрать несколько)
  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // КОМБИНИРОВАННАЯ ФИЛЬТРАЦИЯ
  const filteredTracks = useMemo(() => {
    let result = tracks;

    // 1. Поиск по названию
    if (searchValue) {
      result = result.filter((track) =>
        track.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // 2. Фильтр по автору
    if (selectedAuthors.length > 0) {
      result = result.filter((track) => selectedAuthors.includes(track.author));
    }

    // 3. Фильтр по жанру
    if (selectedGenres.length > 0) {
      result = result.filter((track) => {
        // Защита, если API вернул жанр как строку или массив
        const trackGenres = Array.isArray(track.genre) ? track.genre : [track.genre];
        return selectedGenres.some((g) => trackGenres.includes(g));
      });
    }

    // 4. Сортировка по дате (релиз)
    if (sortOrder === "Сначала новые") {
      result = [...result].sort((a, b) => new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime());
    } else if (sortOrder === "Сначала старые") {
      result = [...result].sort((a, b) => new Date(a.release_date || 0).getTime() - new Date(b.release_date || 0).getTime());
    }

    return result;
  }, [tracks, searchValue, selectedAuthors, selectedGenres, sortOrder]);

  return (
    <div className={styles.centerblock}>
      {/* Прокидываем стейт в поиск */}
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      
      {/* Прокидываем стейты в фильтр (передаем оригинальные tracks для списков) */}
      <Filter 
        tracks={tracks} 
        selectedAuthors={selectedAuthors}
        toggleAuthor={toggleAuthor}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      
      {/* Отдаем отфильтрованные треки в плейлист */}
      <Playlist tracks={filteredTracks} isLoading={isLoading} error={error} />
    </div>
  );
}