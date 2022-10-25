import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@common";

import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  console.log("@");
  return (
    <div className={styles.search_block}>
      <input
        className={styles.search}
        type="text"
        placeholder="Введите название географического объекта"
      />
      <div className={styles.add}>
        <Link to="/add-more">
          <div className={styles.svg} />

          <Button variant="text">Добавить еще</Button>
        </Link>
      </div>
    </div>
  );
};
