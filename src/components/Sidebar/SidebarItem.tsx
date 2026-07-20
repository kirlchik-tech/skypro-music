"use client";

import Link from "next/link";
import styles from "./SidebarItem.module.css";


interface SidebarItemProps {
  item: {
    id: number;
    label: string;
    href: string;
  };
}

export default function SidebarItem({ item }: SidebarItemProps) {
  return (
    <li className={styles.menu__item}>
      <Link href={item.href} className={styles.menu__link}>
        {item.label}
      </Link>
    </li>
  );
}