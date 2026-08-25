"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signup.module.css";
import { registerUser } from "../../../src/api/auth";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !repeatPassword || !username) {
      setError("Заполните все поля");
      return;
    }
    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(email, password, username);
      router.push("/auth/signin");
    } catch (error: unknown) { 
      const err = error as Error; 
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
              className={styles.modal__input}
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={styles.modal__input}
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
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            
            {error && <div className={styles.errorContainer}>{error}</div>}

            <button 
              className={styles.modal__btnSignupEnt} 
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}