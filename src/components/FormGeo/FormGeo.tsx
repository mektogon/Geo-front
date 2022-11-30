import { Field } from "formik";

import { Input, SelectField, TextArea } from "@common";
import { Switch } from "@headlessui/react";

import styles from "./FormGeo.module.scss";

export const FormGeo = ({
  geo,
  values,
  handleBlur,
  handleChange,
  options,
  setFieldValue,
  errors,
}: any) => (
  <div className={styles.form}>
    <div>
      <Input
        type="text"
        name="name"
        placeholder="Название"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={errors.name}
      />
      <TextArea
        placeholder="Описание"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        error={errors.description}
      />

      <TextArea
        name="note"
        placeholder="Заметка"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.note}
        error={errors.note}
      />

      <Input
        type="text"
        name="region"
        placeholder="Регион"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.region}
        error={errors?.region}
      />

      <Input
        type="text"
        name="locality"
        placeholder="Местность"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.locality}
        error={errors?.locality}
      />

      <Field
        name="typeLocality"
        placeholder="Тип Местности"
        component={SelectField}
        options={options}
        onBlur={handleBlur}
        error={errors?.typeLocality}
      />

      <Input
        type="text"
        name="street"
        placeholder="Улица"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.street}
        error={errors?.street}
      />

      <Input
        type="text"
        name="district"
        placeholder="Район"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.district}
        error={errors?.district}
      />

      <Input
        type="text"
        name="houseNumber"
        placeholder="Дом"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.houseNumber}
        error={errors?.houseNumber}
      />
    </div>
  </div>
);
