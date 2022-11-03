import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@common";

import { useSearchGeographyQuery } from "../../features/geo/geo";

import styles from "./Search.module.scss";

interface SearchProps {
  onChange: any;
}

export const Search: React.FC<SearchProps> = ({ onChange }) => {
  console.log("@");
  return (
    <div className={styles.search_block}>
      <input
        className={styles.search}
        type="text"
        onChange={onChange}
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
