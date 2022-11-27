import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
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
import { Switch } from "@headlessui/react";
import { addCardSchema } from "@utils/validation";

import "swiper/css";
import "swiper/css/navigation";

import {
  useDeleteGeoMutation,
  useGetDesignationsQuery,
  useGetGeographyQuery,
  useGetTypeLocalitiesQuery,
  useGetTypesQuery,
  useUpdateGeoMutation,
} from "../../features/geo/geo";
import {
  useDeleteAudioMutation,
  useDeletePhotoMutation,
  useDeleteVideoMutation,
} from "../../features/photo/photo";

import styles from "./Detail.module.scss";

export const Detail = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const { id } = useParams<{ id: any }>();
  const { data: geo, isLoading } = useGetGeographyQuery(id);
  const [deleteGeo, { isLoading: isDeleteGeo }] = useDeleteGeoMutation();
  const [updateGeo, { isLoading: isUpdating }] = useUpdateGeoMutation();
  const [deletePhoto, { isLoading: isDeletingPhoto }] =
    useDeletePhotoMutation();
  const [deleteAudio, { isLoading: isDeletingAudio }] =
    useDeleteAudioMutation();

  const [deleteVideo, { isLoading: isDeletingVideo }] =
    useDeleteVideoMutation();

  const { data: typeObjects, isLoading: isLoadingTypeObjects } =
    useGetTypesQuery([]);

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);

  const { data: typeLocalities, isLoading: isLoadingTypeLocalities } =
    useGetTypeLocalitiesQuery([]);

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

  if (
    isLoading &&
    isLoadingTypeObjects &&
    isLoadingDesignations &&
    isLoadingTypeLocalities
  )
    return <Spinner />;
  if (isUpdating) return <Spinner />;

  if (!geo) return <div>Missing geo!</div>;

  const url = geo?.audioList![0]?.url;

  const deleteHandlerVideo = async (item: number | undefined) => {
    if (window.confirm("Delete video?")) {
      await deleteVideo(item!)
        .unwrap()
        .then((payload: any) => {
          toast.success("Succeeded", payload);
        })
        .catch((data) => toast.error(data.status));
    }
  };

  const deleteHandlerAudio = async (item: number | undefined) => {
    if (window.confirm("Delete audio?")) {
      await deleteAudio(item!)
        .unwrap()
        .then((payload: any) => {
          toast.success("Succeeded", payload);
          window.location.reload();
        })
        .catch((data) => toast.error(data.status));
    }
  };

  const deleteHandler = async (id: any | undefined) => {
    if (window.confirm("Удалить гео-объект?")) {
      await deleteGeo(id!)
        .unwrap()
        .then((payload: any) => {
          toast.success("Deleted", payload);
        })
        .catch(({ data }) => toast.error(data.error));
    }
  };

  const geoInitial = {
    description: geo.description,
    note: geo.note,
    name: geo.name,
    region: geo.addressDto !== null ? geo?.addressDto?.region : "",
    type: geo.type,
    id: geo.id,
    photo: geo?.photoList?.map((photo) => photo),
    audio: geo?.audioList?.map((audio) => audio),
    video: geo?.videoList?.map((video) => video),
    latitude: geo?.latitude,
    designation: geo?.designation,
    longitude: geo?.longitude,
    locality: geo.addressDto !== null ? geo?.addressDto?.locality : "",
    typeLocality: geo.addressDto !== null ? geo?.addressDto?.typeLocality : "",
    isPlaying: geo?.isPlaying,
    street: geo.addressDto !== null ? geo?.addressDto?.street : "",
    district: geo.addressDto !== null ? geo?.addressDto?.district : "",
    houseNumber: geo.addressDto !== null ? geo?.addressDto?.houseNumber : "",
  };

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
            {!isActive ? (
              <div style={{ display: "flex" }}>
                <UpdateIcon />
                Редактировать
              </div>
            ) : (
              <div>Вернуться обратно</div>
            )}
          </div>
          <Button
            className={styles.delete}
            onClick={() => deleteHandler(id)}
            tabIndex={0}
            loading={isDeleteGeo}
            onKeyPress={(e) => {
              if (e.key === "Enter") deleteHandler(id);
            }}
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>

        {isActive ? (
          <Formik
            initialValues={geoInitial}
            validationSchema={addCardSchema}
            onSubmit={async (values) => {
              const data: any = new FormData();

              for (let i = 0; i <= values.photo.length; i++) {
                data.append(`photo`, values.photo[i]);
              }

              data.append("audio", values.audio);
              data.append("video", values.video);

              data.append("name", values.name);

              data.append("id", values.id);
              data.append("description", values.description);
              data.append("isPlaying", values.isPlaying);
              data.append("designation", values.designation);

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
                .catch((data: any) => toast.error(data.data.message));
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
                    <Input
                      placeholder="Фото"
                      name="photo"
                      type="file"
                      className={styles.input}
                      multiple
                      onChange={(event) => {
                        setFieldValue("photo", event.target.files);
                      }}
                    />

                    <Input
                      placeholder="Видео"
                      name="video"
                      type="file"
                      className={styles.input}
                      onChange={(event) => {
                        setFieldValue("video", event.target.files[0]);
                      }}
                    />

                    <div className={styles.geo}>
                      <div className={styles.geo_designation}>
                        <Field
                          placeholder="Обозначение"
                          name="designation"
                          options={options2}
                          component={SelectField}
                          error={errors.designation}
                        />

                        <Input
                          placeholder="Аудио"
                          name="audio"
                          type="file"
                          className={styles.input}
                          onChange={(event) => {
                            setFieldValue("audio", event.target.files[0]);
                          }}
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

                        <div className={styles.toggle}>
                          <p className={styles.audio}>
                            Аудио воспроизводится сразу
                          </p>
                          <Switch
                            checked={values.isPlaying}
                            onChange={(value) =>
                              setFieldValue("isPlaying", value)
                            }
                            name="isPlaying"
                            style={{ width: "3rem" }}
                            className={`${
                              values.isPlaying ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span
                              className={`${
                                values.isPlaying
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.right}>
                    <FormGeo
                      geo={geo}
                      update={updateGeo}
                      errors={errors}
                      options={options3}
                      setIsActive={setIsActive}
                      isActive={isActive}
                      setFieldValue={setFieldValue}
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
              <div className={styles.switch}>
                <div>PHOTO \ VIDEO</div>
                <Switch
                  checked={isToggle}
                  onChange={setIsToggle}
                  className={`${
                    isToggle ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      isToggle ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              {!isToggle ? (
                <Slider items={geo.photoList} />
              ) : (
                <div className={styles.video_player}>
                  <ReactPlayer
                    url={geo?.videoList[0]?.url}
                    controls
                    width="100%"
                  />

                  <Button
                    variant="text"
                    disabled={isDeletingVideo}
                    onClick={() => deleteHandlerVideo(geo.videoList[0].id)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter")
                        deleteHandlerVideo(geo.videoList[0].id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )}
              <div className={styles.designation}>
                <div>
                  <p>Обозначение</p>
                  <LoadableImage
                    style={styles.image}
                    src={geo?.designation?.url}
                  />
                </div>
                <div className={styles.desc}>
                  <div className={styles.item}>
                    <div className={styles.label}>Широта:</div>
                    <div className={styles.text_geo}>{geo.latitude}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Долгота:</div>
                    <div className={styles.text_geo}>{geo.longitude}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Тип:</div>
                    <div className={styles.text_geo}>{geo.type}</div>
                  </div>
                </div>
              </div>

              {!geo.audioList?.length <= 0 && (
                <div className={styles.audio_player}>
                  <div>
                    <Player url={url} />
                  </div>
                  <div className={styles.icon}>
                    <Button
                      variant="text"
                      disabled={isDeletingAudio}
                      onClick={() => deleteHandlerAudio(geo.audioList[0].id)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter")
                          deleteHandlerAudio(geo.audioList[0].id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.right}>
              <div className={styles.info}>
                <div className={styles.items}>
                  <div className={styles.item}>
                    <div className={styles.label}>Описание:</div>
                    <div className={styles.text_description}>
                      {geo.description}
                    </div>
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
                      {geo?.addressDto?.typeLocality}
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

                  <div className={styles.item}>
                    <div className={styles.label}>Автовоспроизведение:</div>
                    <div className={styles.text}>
                      {geo.isPlaying === true ? "Да" : "Нет"}
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
