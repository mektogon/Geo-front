import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { Button } from "@common";

import styles from "./Search.module.scss";

interface SearchProps extends React.ComponentPropsWithRef<"input"> {
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void;
  isActive?: boolean;
}

export const Search: React.FC<SearchProps> = ({ onChange, isActive }) => (
  <div className={styles.search_block}>
    <input
      className={styles.search}
      type="search"
      onChange={onChange}
      placeholder="Введите название географического объекта"
    />
    {isActive && (
      <div className={styles.add}>
        <Link to="/add-more">
          <div className={styles.svg} />

          <Button variant="text">Добавить еще</Button>
        </Link>
      </div>
    )}
  </div>
);
