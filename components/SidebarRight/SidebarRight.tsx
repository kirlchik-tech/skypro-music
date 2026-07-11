import Image from "next/image";
import styles from "./SidebarRight.module.css";

export default function SidebarRight() {
  return (
    <div className={styles.main__sidebar}>
      
      {/* Блок пользователя сверху */}
      <div className={styles.sidebar__personal}>
        <div className={styles.sidebar__icon}>
          <svg alt="logout">
            <use xlinkHref="/img/icon/sprite.svg#public"></use>
          </svg>
        </div>
      </div>

      {/* Блок с плейлистами */}
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Image src="/img/playlist01.png" alt="Плейлист дня" width={250} height={150} className={styles.sidebar__img} />
          </div>
          <div className={styles.sidebar__item}>
            <Image src="/img/playlist02.png" alt="100 танцевальных хитов" width={250} height={150} className={styles.sidebar__img} />
          </div>
          <div className={styles.sidebar__item}>
            <Image src="/img/playlist03.png" alt="Инди-заряд" width={250} height={150} className={styles.sidebar__img} />
          </div>
        </div>
      </div>
    </div>
  );
}