import React from "react";

import { Button, Input } from "@common";
import { Category } from "@components";

import styles from "./Categories.module.scss";

export const Categories = () => {
  console.log("Categories");
  return (
    <div className={styles.categories_inner}>
      <div>
        <h1 className={styles.title}>Добавить Категорию</h1>
        <div className={styles.add}>
          <p>Название:</p>
          <div className={styles.input}>
            <Input text="Введите название" />
          </div>
          <Button variant="text">Save</Button>
        </div>
      </div>

      <div className={styles.categories}>
        <Category />
      </div>
    </div>
  );
};
