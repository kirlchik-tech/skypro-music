"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signin.module.css";
import { loginUser, getToken } from "../../../src/api/auth";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsLoading(true);
      await loginUser(email, password);
      const userData = await loginUser(email, password); 
  const tokens = await getToken(email, password);
localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  localStorage.setItem("username", userData.username);

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form}>
            <Link href="/" className={styles.modal__logo}>
              <Image src="/img/logo.png" alt="logo" width={140} height={21} priority />
            </Link>
            <input
              className={`${styles.modal__input} ${styles.login}`}
              type="text"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {error && <div className={styles.errorContainer}>{error}</div>}

            <button 
              className={styles.modal__btnEnter} 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
            <button 
              className={styles.modal__btnSignup} 
              onClick={(e) => {
                e.preventDefault();
                router.push("/auth/signup");
              }}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}