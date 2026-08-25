"use client";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (val: string) => void;
}

export default function SearchBar({ searchValue, setSearchValue }: SearchBarProps) {
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} // Меняем стейт при вводе
      />
    </div>
  );
}