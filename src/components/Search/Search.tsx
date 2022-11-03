import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { Button, Input } from "@common";

import styles from "./Search.module.scss";

interface SearchProps extends React.ComponentPropsWithRef<"input"> {
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void;
}

export const Search: React.FC<SearchProps> = ({ onChange }) => (
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
