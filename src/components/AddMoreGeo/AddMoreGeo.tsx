import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Input, SelectField, Spinner, TextArea } from "@common";
import { UploadComponent } from "@common/upload/Upload";
import { Switch } from "@headlessui/react";
import { addCardSchema } from "@utils/validation";

import {
  useCreateGeoMutation,
  useGetDesignationsQuery,
  useGetTypeLocalitiesQuery,
  useGetTypesQuery,
} from "../../features/geo/geo";

import styles from "./AddMoreGeo.module.scss";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    marginTop: 15,
  }),
};

const geo = {
  name: "",
  type: "",
  designation: "",
  latitude: "",
  longitude: "",
  note: "",
  description: "",
  isPlaying: false,
  photo: [],
  audio: [],
  video: [],
  region: "",
  typeLocality: "",
  locality: "",
  street: "",
  district: "",
  houseNumber: "",
};

export const AddMoreGeo = () => {
  const navigate = useNavigate();

  const [createGeo, { isLoading: isLoadingCreateGeo }] = useCreateGeoMutation();

  const { data: typeObjects, isLoading: isLoadingTypeObjects } =
    useGetTypesQuery([]);

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);

  const { data: typeLocalities, isLoading: isLoadingTypeLocalities } =
    useGetTypeLocalitiesQuery([]);

  if (isLoadingTypeObjects && isLoadingDesignations) return <Spinner />;

  const options = typeObjects?.map((type: any) => ({
    value: type.name,
    label: type.name,
  }));

  const options2 = designations?.map((type: any) => ({
    value: type.name,
    label: type.name,
  }));

  const options3 = typeLocalities?.map((type: any) => ({
    value: type.name,
    label: type.name,
  }));

  if (isLoadingCreateGeo) return <Spinner />;
  const toggleClass = " transform translate-x-5 text-transparent";

  return (
    <div className={styles.add}>
      <Formik
        initialValues={geo}
        // validationSchema={addCardSchema}
        onSubmit={async (values) => {
          const data: any = new FormData();

          for (let i = 0; i < values.photo.length; i++) {
            data.append("photo", values.photo[i]);
          }

          data.append("name", values.name);
          data.append("audio", values.audio[0]);
          data.append("video", values.video[0]);

          data.append("type", values.type);
          data.append("designation", values.designation);
          data.append("latitude", values.latitude);
          data.append("longitude", values.longitude);
          data.append("note", values.note);
          data.append("description", values.description);

          data.append("isPlaying", values.isPlaying);

          data.append("region", values.region);
          data.append("typeLocality", values.typeLocality);

          data.append("locality", values.locality);
          data.append("street", values.street);
          data.append("district", values.district);
          data.append("houseNumber", values.houseNumber);

          await createGeo(data)
            .unwrap()
            .then((payload: any) => {
              toast.success("Succeeded", payload);
              navigate("/");
            })
            .catch((data) => toast.error(data.status));
        }}
      >
        {({
          values,
          handleChange,
          errors,
          handleBlur,
          isValid,
          dirty,
          setFieldValue,
        }) => (
          <Form>
            <div className={styles.inputs}>
              <div className={styles.toggle_bg}>
                <div className={styles.label}>Проигрывать аудио сразу?</div>
                <div className={styles.toggle}>
                  <Switch
                    checked={values.isPlaying}
                    onChange={(value) => setFieldValue("isPlaying", value)}
                    name="isPlaying"
                    className={`${
                      values.isPlaying ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        values.isPlaying ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </div>
              <Input
                placeholder="Название"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />

              <UploadComponent
                setFieldValue={setFieldValue}
                name="photo"
                placeholder="Фото"
                maxFiles={5}
                size="70px"
                extension="'jpeg', 'png'"
              />
              {values.photo &&
                values.photo.map(({ name }, i): any => (
                  <li key={i}>{`File: ${name}`}</li>
                ))}

              <UploadComponent
                setFieldValue={setFieldValue}
                name="audio"
                maxFiles={1}
                placeholder="Аудио"
                size="70px"
                extension='"avi", "mp4", "mkv", "wmv", "asf", "mpeg"'
              />

              {values.audio &&
                values.audio.map(({ name }, i): any => (
                  <li key={i}>{`File:${name}`}</li>
                ))}

              <UploadComponent
                setFieldValue={setFieldValue}
                name="video"
                maxFiles={1}
                size="70px"
                placeholder="Видео"
                extension='"avi", "mp4", "mkv", "wmv", "asf", "mpeg"'
              />

              {values.video &&
                values.video.map(({ name }, i): any => (
                  <li key={i}>{`File:${name}`}</li>
                ))}

              <Field
                name="type"
                component={SelectField}
                options={options}
                placeholder="Тип Объекта"
                styles={customStyles}
                error={errors.type}
              />
              <Field
                placeholder="Обозначение"
                name="designation"
                options={options2}
                component={SelectField}
                styles={customStyles}
                error={errors.designation}
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
                name="region"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.region}
                error={errors?.region}
              />
              <Field
                name="typeLocality"
                placeholder="Тип Местности"
                component={SelectField}
                options={options3}
                onBlur={handleBlur}
                styles={customStyles}
                error={errors?.typeLocality}
              />
              <Input
                placeholder="Местность"
                type="text"
                name="locality"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.locality}
                error={errors?.locality}
              />
              <Input
                placeholder="Улица"
                type="text"
                name="street"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                error={errors?.street}
              />
              <Input
                placeholder="Район"
                type="text"
                name="district"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors?.district}
              />
              <Input
                placeholder="Дом"
                type="text"
                name="houseNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.houseNumber}
                error={errors?.houseNumber}
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
              <Button
                type="submit"
                variant="outlined"
                disabled={!(isValid && dirty)}
              >
                Сохранить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
