import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@common";
import { ROUTES } from "@utils/constants";
import { useAppDispatch, useAppSelector } from "@utils/hooks";

import { logout, reset } from "../../features/auth/authSlice";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { username } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsOpen(false);
    toast.success(`Возвращайтесь`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <header className={styles.header}>
      <Link to={ROUTES.HOME}>
        <div className={styles.logo} />
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to={ROUTES.CATEGORY} className={styles.link}>
              Категории
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={ROUTES.DESIGNATIONS} className={styles.link}>
              Обозначения
            </Link>
          </li>
          <li className={styles.item}>
            {!username ? (
              <Link to="/auth">
                <Button variant="outlined">Sign In</Button>
              </Link>
            ) : (
              <Button variant="outlined" onClick={onLogout}>
                Выход
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
