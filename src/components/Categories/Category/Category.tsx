import React from "react";

import styles from "./Category.module.scss";

export const Category = () => {
  console.log("Category");

  return (
    <div className={styles.category}>
      <p className={styles.text}>категория</p>
      <div className={styles.icons}>
        <div className={styles.update} />
        <div className={styles.delete} />
      </div>
    </div>
  );
};
