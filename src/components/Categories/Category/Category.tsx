import React from "react";
import { toast } from "react-toastify";

import { Button } from "@common";

import { useDeleteCategoryMutation } from "../../../features/categories/categories";
import { Ctg } from "../../../features/categories/categories.types";

import styles from "./Category.module.scss";

export const Category = ({ name, id }: Ctg) => {
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();

  const deleteHandler = async (id: Ctg["id"] | undefined) => {
    if (window.confirm("Delete category?")) {
      await deleteCategory(id!).unwrap();
    }
  };

  return (
    <div className={styles.category}>
      <p className={styles.text}>{name}</p>
      <div className={styles.icons}>
        <div className={styles.update} />
        <Button
          className={styles.delete}
          disabled={isDeletingCategory}
          onClick={() => deleteHandler(id)}
          onKeyPress={(e) => {
            if (e.key === "Enter") deleteHandler(id);
          }}
        />
      </div>
    </div>
  );
};
