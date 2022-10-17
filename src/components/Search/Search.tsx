import React from "react";

import { Button } from "@common/buttons";

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
        <div className={styles.svg} />

        <Button variant="text">Добавить еще</Button>
      </div>
    </div>
  );
};
