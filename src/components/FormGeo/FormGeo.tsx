import { Form, Formik } from "formik";

import { Button, Input, TextArea } from "@common";

import { useCreateGeoMutation } from "../../features/geo/geo";

import styles from "./FormGeo.module.scss";

export const FormGeo = ({ geo }: any) => {
  const [createGeo, { isLoading: isLoadingCreateGeo }] = useCreateGeoMutation();

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{
          description: geo.description,
          note: geo.note,
          region: "",
          type: geo.type,
          terrain: "",
          street: "",
          district: "",
          home: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className={styles.sign_in_form}>
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
              value={values.terrain}
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
              value={values.home}
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
