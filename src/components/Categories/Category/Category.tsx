import React from "react";

import { Button, EditableInput } from "@common";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../features/categories/categories";
import { Ctg } from "../../../features/categories/categories.types";

import styles from "./Category.module.scss";

export const Category = ({ name, id }: Ctg) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();

  const deleteHandler = async (id: Ctg["id"] | undefined) => {
    if (window.confirm("Удалить категорию?")) {
      await deleteCategory(id!).unwrap();
    }
  };

  return (
    <div className={styles.category}>
      {isEditing ? (
        <EditableInput
          name={name}
          active={false}
          column
          onUpdate={(name) =>
            updateCategory({ id, name })
              .then((result: any) => {
                setIsEditing(false);
              })
              .catch((error) => console.error("Ошибка обновления!", error))
          }
          onCancel={() => setIsEditing(false)}
          loading={isUpdatingCategory}
        />
      ) : (
        <div className={styles.right}>
          <div className={styles.right_title}>
            <h3 className={styles.title}>{name}</h3>
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.update}
              onClick={() => setIsEditing(true)}
              disabled={isUpdatingCategory}
            />

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
      )}
    </div>
  );
};
