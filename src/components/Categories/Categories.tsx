import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

import { Button, Input, Spinner } from "@common";
import { Category } from "@components";

import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/categories/categories";
import { Ctg } from "../../features/categories/categories.types";

import styles from "./Categories.module.scss";

interface CategoryProps {
  searchTerm?: string | null | undefined;
}

export const Categories: React.FC<CategoryProps> = ({ searchTerm }) => {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery([]);

  const [addCategory, { isLoading: isLoadingCreateCategory }] =
    useAddCategoryMutation();

  const onSubmit = async (data: any, { resetForm }: any) => {
    await addCategory(data)
      .unwrap()
      .then((payload: any) => {
        toast.success("Успешно!", payload);
        resetForm("");
      })
      .catch((error: any) => toast.error(error.data));
  };

  if (isLoadingCategories) return <Spinner />;

  return (
    <div className={styles.categories_inner}>
      <div>
        <h1 className={styles.title}>Добавить Категорию</h1>
        <div className={styles.add}>
          <p>Название:</p>
          <div className={styles.input}>
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={onSubmit}
            >
              {({ values, handleChange, errors, handleBlur }) => (
                <Form className={styles.form}>
                  <Input
                    text="Введите название"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name}
                  />
                  <Button variant="text" loading={isLoadingCreateCategory}>
                    Сохранить
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className={styles.categories}>
        {categories
          ?.filter(({ name }: any) =>
            name.toLowerCase().includes(searchTerm!.toLowerCase())
          )
          .map((category: Ctg) => (
            <Category {...category} key={category.id} />
          ))}
      </div>
    </div>
  );
};
