import { Field, Form, Formik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";

import { Button, Dropzone, Input, SelectField, TextArea } from "@common";

import {
  useCreateGeoMutation,
  useGetDesignationsQuery,
  useGetTypeLocalitiesQuery,
  useGetTypesQuery,
} from "../../features/geo/geo";

import styles from "./AddMoreGeo.module.scss";

const customStyles = {
  control: (provided) => ({
    ...provided,
    marginTop: 15,
  }),
};

export const AddMoreGeo = () => {
  const [createGeo, { isLoading: isLoadingCreateGeo }] = useCreateGeoMutation();

  const { data: typeObjects, isLoading: isLoadingTypeObjects } =
    useGetTypesQuery();

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery();

  const { data: typeLocalities, isLoading: isLoadingTypeLocalities } =
    useGetTypeLocalitiesQuery();

  if (isLoadingTypeObjects && isLoadingDesignations) return <p>loading</p>;

  const options = typeObjects?.map((type) => ({
    value: type.name,
    label: type.name,
  }));

  const options2 = designations?.map((type) => ({
    value: type.name,
    label: type.name,
  }));

  const options3 = typeLocalities?.map((type) => ({
    value: type.name,
    label: type.name,
  }));

  if (isLoadingCreateGeo) return <p>create loading</p>;

  const onSubmit = async (data: any) => {
    await createGeo(data)
      .unwrap()
      .then((payload: any) => toast.success("Succeeded", payload))
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <div className={styles.add}>
      <Formik
        initialValues={{
          name: "",
          type: "",
          designation: "",
          latitude: "",
          longitude: "",
          note: "",
          description: "",

          addressDto: {
            region: "",
            typeLocality: "",
            locality: "",
            street: "",
            district: "",
            houseNumber: "",
          },
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, handleChange, touched, errors, handleBlur }) => (
          <Form>
            <div className={styles.inputs}>
              <Input
                placeholder="Название"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />

              <Field
                placeholder="Тип объекта"
                name="type"
                component={SelectField}
                options={options}
                styles={customStyles}
              />

              <Field
                placeholder="Обозначение"
                name="designation"
                options={options2}
                component={SelectField}
                styles={customStyles}
              />

              <Input
                placeholder="Широта"
                type="text"
                name="latitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latitude}
                error={errors.latitude}
              />

              <Input
                placeholder="Долгота"
                type="text"
                name="longitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.longitude}
                error={errors.longitude}
              />

              <Input
                placeholder="Заметка"
                type="text"
                name="note"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.note}
                error={errors.note}
              />

              <Input
                placeholder="Регион"
                type="text"
                name="addressDto.region"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressDto.region}
                // error={errors.addressDto.region}
              />

              <Field
                name="typeLocality"
                placeholder="Тип Местности"
                component={SelectField}
                options={options3}
                styles={customStyles}
              />

              <Input
                placeholder="Местность"
                type="text"
                name="addressDto.locality"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressDto.locality}
                // error={errors.addressDto.locality}
              />

              <Input
                placeholder="Улица"
                type="text"
                name="addressDto.street"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressDto.street}
                // error={errors.street}
              />

              <Input
                placeholder="Район"
                type="text"
                name="addressDto.district"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressDto.district}
                // error={errors.addressDto.district}
              />

              <Input
                placeholder="Дом"
                type="text"
                name="addressDto.houseNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressDto.houseNumber}
                // error={errors.addressDto.houseNumber}
              />

              <TextArea
                placeholder="Описание"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description}
              />
            </div>

            <div className={styles.buttons}>
              <Button type="submit" variant="outlined">
                Сохранить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
