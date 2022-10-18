import React from "react";

import { useGetGeographiesQuery } from "../../features/geo/geo";

import styles from "./List.module.scss";

export const List = () => {
  console.log("list");
  const { data, isError, isLoading } = useGetGeographiesQuery({});

  console.log(data, "data");

  return (
    <div className={styles.list}>
      <div className={styles.card}>
        <div className={styles.top} />
        <div className={styles.bot}>
          <div className={styles.left}>
            <h2 className={styles.title}>Title</h2>
            <p className={styles.desc}>Долгота</p>
            <p className={styles.desc}>Широта</p>
          </div>
          <div className={styles.right}>
            <div>update</div>
            <div>delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
