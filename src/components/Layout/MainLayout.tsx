import Sidebar from "../Sidebar/Sidebar";
import SidebarRight from "../SidebarRight/SidebarRight"; 
import Player from "../Player/Player";
import styles from "./MainLayout.module.css";


interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Sidebar />      
          {children}  
          <SidebarRight />  
        </div>
        <Player />
      </div>
    </div>
  );
}