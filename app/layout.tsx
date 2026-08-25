import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReduxProvider from "../src/store/ReduxProvider"; 


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"], 
  weight: ["400", "500", "600", "700"], 
  display: "swap", 
});

export const metadata: Metadata = {
  title: "Skypro Music",
  description: "Музыкальное приложение",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      {/*. Применяем класс шрифта ко всему тегу body */}
      <body className={montserrat.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        
        <ToastContainer 
          position="bottom-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" 
        />
      </body>
    </html>
  );
}