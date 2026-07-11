import Sidebar from "../Sidebar/Sidebar";
import CenterBlock from "../CenterBlock/CenterBlock";
import SidebarRight from "../SidebarRight/SidebarRight"; 
import Player from "../Player/Player";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Sidebar />      
          <CenterBlock />  
          <SidebarRight />  
        </div>
        <Player />
      </div>
    </div>
  );
}