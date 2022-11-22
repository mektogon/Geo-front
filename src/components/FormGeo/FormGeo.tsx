import { Form, Formik } from "formik";
import { toast } from "react-toastify";

import { Button, Input, Spinner, TextArea } from "@common";

import {
  useCreateGeoMutation,
  useUpdateGeoMutation,
} from "../../features/geo/geo";

import styles from "./FormGeo.module.scss";

export const FormGeo = ({ geo, values, handleBlur, handleChange }: any) => {
  console.log(geo, "geo");

  return (
    <div className={styles.form}>
      <div>
        <TextArea
          placeholder="Описание"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />

        <Input
          type="text"
          name="note"
          placeholder="Заметка"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.note}
        />

        <Input
          type="text"
          name="region"
          placeholder="Регион"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.region}
        />

        <Input
          type="text"
          name="locality"
          placeholder="Местность"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.locality}
        />

        <Input
          type="text"
          name="street"
          placeholder="Улица"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.street}
        />

        <Input
          type="text"
          name="district"
          placeholder="Район"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.district}
        />

        <Input
          type="text"
          name="houseNumber"
          placeholder="Дом"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.houseNumber}
        />
      </div>
    </div>
  );
};
