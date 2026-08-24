import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TrackItem.module.css"; 

export default function TrackItemSkeleton() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#444444">
      <div className={styles.playlist__item}>
        <div className={styles.playlist__track}>
          
          <div className={styles.track__title}>
            <div className={styles.track__titleImage}>
              {/* Квадрат для иконки ноты */}
              <Skeleton width={51} height={51} />
            </div>
            <div className={styles.track__titleText}>
              {/* Полоска для названия трека */}
              <Skeleton width={250} height={19} />
            </div>
          </div>
          
          <div className={styles.track__author}>
            {/* Полоска для автора */}
            <Skeleton width={220} height={19} />
          </div>
          
          <div className={styles.track__album}>
            {/* Полоска для альбома */}
            <Skeleton width={150} height={19} />
          </div>
          
          <div className={styles.track__time}>
            {/* Полоска для времени */}
            <Skeleton width={40} height={19} />
          </div>
          
        </div>
      </div>
    </SkeletonTheme>
  );
}