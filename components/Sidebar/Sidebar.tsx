"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Добавили пункт "Войти" сюда
  const menuItems = [
    { id: 1, label: "Главное", href: "/" },
    { id: 2, label: "Мои треки", href: "/my-tracks" },
    { id: 3, label: "Войти", href: "/auth/signin" }, 
  ];

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
  <Image 
    src="/img/logo.png" 
    alt="Skypro Music" 
    width={113} 
    height={17} 
    priority 
  />
</div>
      
      <button className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </button>

      <div className={`${styles.nav__menu} ${isOpen ? styles.menu__open : styles.menu__closed}`}>
        <ul className={styles.menu__list}>
          {menuItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}