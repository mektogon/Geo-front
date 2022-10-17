import React from "react";

import { Button } from "@common/buttons";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  console.log("@");
  return (
    <header className={styles.header}>
      <div className={styles.logo} />
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="/*" className={styles.link}>
              Категории
            </a>
          </li>
          <li className={styles.item}>
            <a href="/*" className={styles.link}>
              Обозначения
            </a>
          </li>
          <li className={styles.item}>
            <Button variant="outlined">Sign In</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
