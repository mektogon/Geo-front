import { Form, Formik } from "formik";

import { Button, Input, TextArea } from "@common";

import {
  useCreateGeoMutation,
  useUpdateGeoMutation,
} from "../../features/geo/geo";

import styles from "./FormGeo.module.scss";

export const FormGeo = ({ geo }: any) => {
  const [updateGeo, { isLoading: isUpdating }] = useUpdateGeoMutation();

  console.log(geo, "geo");

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{
          description: geo.description,
          note: geo.note,
          region: geo?.addressDto.region,
          type: geo.type,
          locality: geo?.addressDto.locality,
          street: geo?.addressDto.street,
          district: geo?.addressDto.district,
          houseNumber: geo?.addressDto.houseNumber,
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form
            className={styles.sign_in_form}
            onSubmit={async (values) =>
              updateGeo(values)
                .then((result) => {
                  console.log("Update Result", result);
                })
                .catch((error) => console.error("Update Error", error))
            }
          >
            <TextArea
              placeholder="Описание"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />

            <Input
              type="text"
              name="Note"
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
              name="type"
              placeholder="Тип"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
            />

            <Input
              type="text"
              name="terrain"
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
              name="home"
              placeholder="Дом"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.houseNumber}
            />

            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
