import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  DeleteIcon,
  Input,
  LoadableImage,
  Player,
  SelectField,
  Spinner,
  UpdateIcon,
} from "@common";
import { UploadComponent } from "@common/upload/Upload";
import { FormGeo, Slider } from "@components";

import "swiper/css";
import "swiper/css/navigation";

import {
  useDeleteGeoMutation,
  useGetDesignationsQuery,
  useGetGeographyQuery,
  useGetTypesQuery,
  useUpdateGeoMutation,
} from "../../features/geo/geo";

import styles from "./Detail.module.scss";

export const Detail = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { id } = useParams<{ id: any }>();
  const { data: geo, isLoading } = useGetGeographyQuery(id);
  const [deleteGeo, { isLoading: isDeleteGeo }] = useDeleteGeoMutation();
  const [updateGeo, { isLoading: isUpdating }] = useUpdateGeoMutation();

  const { data: typeObjects, isLoading: isLoadingTypeObjects } =
    useGetTypesQuery([]);

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);

  const options = typeObjects?.map((type: any) => ({
    value: type.name,
    label: type.name,
  }));

  const options2 = designations?.map((type: any) => ({
    value: type.name,
    label: type.name,
  }));

  if (isLoading && isLoadingTypeObjects && isLoadingDesignations)
    return <Spinner />;
  if (isUpdating) return <Spinner />;

  if (!geo) return <div>Missing geo!</div>;

  const url = geo?.audioList![0];

  console.log(geo, "geo");

  return (
    <div className={styles.detail}>
      <div className={styles.img}>
        <h3 className={styles.title}>{geo.name}</h3>
        <div className={styles.actions}>
          <div
            className={styles.update}
            onClick={() => setIsActive(!isActive)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") setIsActive(true);
            }}
          >
            <UpdateIcon />
            Редактировать
          </div>
          <Button
            className={styles.delete}
            onClick={() => deleteGeo(id).then(() => navigate("/"))}
            tabIndex={0}
            loading={isDeleteGeo}
            onKeyPress={(e) => {
              if (e.key === "Enter") deleteGeo(id).then(() => navigate("/"));
            }}
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>

        {isActive ? (
          <Formik
            initialValues={{
              description: geo.description,
              note: geo.note,
              region: geo?.addressDto?.region,
              type: geo.type,
              id: geo.id,
              photo: geo?.photoList?.map((photo) => photo),
              latitude: geo?.latitude,
              designation: geo?.designation,
              longitude: geo?.longitude,
              locality: geo?.addressDto?.locality,
              typeLocality: geo?.addressDto?.typeLocality,
              street: geo?.addressDto?.street,
              district: geo?.addressDto?.district,
              houseNumber: geo?.addressDto?.houseNumber,
            }}
            onSubmit={async (values) => {
              const data: any = new FormData();

              for (let i = 0; i < values.photo.length; i++) {
                data.append("photo", values.photo[i]);
              }

              data.append("id", values.id);
              data.append("description", values.description);

              data.append("type", values.type);
              data.append("note", values.note);

              data.append("region", values.region);
              data.append("typeLocality", values?.typeLocality);

              data.append("longitude", values.longitude);
              data.append("latitude", values.latitude);

              data.append("locality", values.locality);
              data.append("street", values.street);
              data.append("district", values.district);
              data.append("houseNumber", values.houseNumber);

              await updateGeo(data)
                .unwrap()
                .then((payload: any) => {
                  toast.success("Succeeded", payload);
                  setIsActive(!isActive);
                })
                .catch((data: any) => toast.error(data.status));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldValue,
            }) => (
              <Form>
                <div className={styles.block}>
                  <div className={styles.left}>
                    <UploadComponent
                      setFieldValue={setFieldValue}
                      name="photo"
                      placeholder="Фото"
                      size="250px"
                      maxFiles={5}
                      extension="'jpeg', 'png'"
                    />

                    {values.photo &&
                      values.photo.map(({ name }: any, i) => (
                        <li key={i}>{`File: ${name}`}</li>
                      ))}

                    <div className={styles.geo}>
                      <div className={styles.geo_designation}>
                        <Field
                          placeholder="Обозначение"
                          name="designation"
                          options={options2}
                          component={SelectField}
                          error={errors.designation}
                        />
                      </div>

                      <div className={styles.type_object}>
                        <Field
                          name="type"
                          component={SelectField}
                          options={options}
                          placeholder="Тип Объекта"
                          error={errors.type}
                        />
                        <Input
                          placeholder="Широта"
                          type="text"
                          name="latitude"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.latitude}
                        />
                        <Input
                          placeholder="Долгота"
                          type="text"
                          name="longitude"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.longitude}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.right}>
                    <FormGeo
                      geo={geo}
                      update={updateGeo}
                      setIsActive={setIsActive}
                      isActive={isActive}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />

                    <Button type="submit" variant="outlined">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className={styles.block}>
            <div className={styles.left}>
              <Slider items={geo.photoList} />
              <div className={styles.designation}>
                <div>
                  <p>Обозначения</p>
                  <LoadableImage style={styles.image} src={geo.designation} />
                </div>
                <div className={styles.desc}>
                  <p>Широта: {geo.latitude}</p>
                  <p>Долгота: {geo.longitude}</p>
                  <p>Тип: {geo.type}</p>
                </div>
              </div>
              <Player url={url} />
            </div>

            <div className={styles.right}>
              <div className={styles.info}>
                <div className={styles.items}>
                  <div className={styles.item}>
                    <div className={styles.label}>Описание:</div>
                    <div className={styles.text}>{geo.description}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Заметка:</div>
                    <div className={styles.text}>{geo.note}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Регион:</div>
                    <div className={styles.text}>{geo.addressDto?.region}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Тип местности:</div>
                    <div className={styles.text}>
                      {geo.addressDto.typeLocality}
                    </div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Местность:</div>
                    <div className={styles.text}>
                      {geo.addressDto?.locality}
                    </div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Улица:</div>
                    <div className={styles.text}>{geo.addressDto?.street}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Район:</div>
                    <div className={styles.text}>
                      {geo.addressDto?.district}
                    </div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Дом:</div>
                    <div className={styles.text}>
                      {geo.addressDto?.houseNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
