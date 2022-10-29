import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";

import { Button, Dropzone, Input, TextArea } from "@common";

import {
  useCreateGeoMutation,
  useGetDesignationsQuery,
  useGetTypesQuery,
} from "../../features/geo/geo";

import styles from "./AddMoreGeo.module.scss";

interface PostData {
  name?: string;
  type?: string;
  designation: string;
  latitude: string;
  longitude: string;
  description: string;
  note: string;
  region: string;
  typelocality: string;
  locality: string;
  street: string;
  district: string;
  houseNumber: string;
}

export const AddMoreGeo = () => {
  const [photo, setPhoto] = useState<[]>([]);
  const [video, setVideo] = useState<[]>([]);
  const [audio, setAudio] = useState<[]>([]);

  const [name, setName] = useState<PostData["name"]>();
  const [type, setType] = useState<PostData["type"]>();
  const [designation, setDesignation] = useState<PostData["designation"]>();
  const [latitude, setLatitude] = useState<PostData["latitude"]>();
  const [longitude, setLongitude] = useState<PostData["longitude"]>();
  const [description, setDescription] = useState<PostData["description"]>();
  const [note, setNote] = useState<PostData["note"]>();
  const [region, setRegion] = useState<PostData["region"]>();
  const [typelocality, setTypeLocality] = useState<PostData["typelocality"]>();
  const [locality, setLocality] = useState<PostData["locality"]>();
  const [street, setStreet] = useState<PostData["street"]>();
  const [district, setDistrict] = useState<PostData["district"]>();
  const [houseNumber, setHouseNumber] = useState<PostData["houseNumber"]>();

  const [createGeo, { isLoading: isLoadingCreateGeo }] = useCreateGeoMutation();

  const { data: typeObjects, isLoading: isLoadingTypeObjects } =
    useGetTypesQuery();

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: any = new FormData();

    for (let i = 0; i < photo.length; i++) {
      body.append("photo", photo[i]);
    }
    for (let i = 0; i < video.length; i++) {
      body.append("video", video[i]);
    }

    for (let i = 0; i < audio.length; i++) {
      body.append("audio", audio[i]);
    }

    body.append("name", name!);
    body.append("type", type);
    body.append("designation", designation);
    body.append("latitude", latitude);

    body.append("longitude", longitude);
    body.append("description", description);
    body.append("note", note);
    body.append("region", region);
    body.append("typelocality", typelocality);
    body.append("locality", locality);
    body.append("street", street);
    body.append("district", district);
    body.append("houseNumber", houseNumber);

    console.log(body, "body");

    await createGeo(body)
      .unwrap()
      .then((data) => console.log("Succeeded", data))
      .catch((error) => console.log(error, "error"));
  };

  if (isLoadingTypeObjects && isLoadingDesignations) return <p>loading</p>;

  const options = typeObjects?.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  if (isLoadingCreateGeo) return <p>create loading</p>;

  return (
    <div className={styles.add}>
      <form
        className={styles.add_form}
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <Input
          placeholder="Название"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <Dropzone
          placeholder="Фото"
          files={photo}
          setFiles={setPhoto}
          maxFiles={5}
          text="Drop the files here: jpeg, png"
        />

        <Dropzone
          placeholder="Видео"
          files={video}
          setFiles={setVideo}
          maxFiles={1}
          text='Drop the files here: "avi", "mp4", "mkv", "wmv", "asf", "mpeg"'
        />

        <Dropzone
          placeholder="Аудио"
          files={audio}
          setFiles={setAudio}
          maxFiles={1}
          text='Drop the files here: "mp3", "ogg", "wav", "aiff", "ape", "flac", "mpeg", "m4a", "mp4"'
        />

        <Input
          placeholder="Тип объекта"
          type="text"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />

        {/* <Select
          placeholder="Тип объекта"
          name="name"
          options={options}
          onChange={(e) => setType(e.target.value)}
        /> */}

        <Input
          placeholder="Обозначение"
          type="text"
          name="designation"
          onChange={(e) => setDesignation(e.target.value)}
        />

        <Input
          placeholder="Широта"
          type="text"
          name="latitude"
          onChange={(e) => setLatitude(e.target.value)}
        />

        <Input
          placeholder="Долгота"
          type="text"
          name="longitude"
          onChange={(e) => setLongitude(e.target.value)}
        />

        <TextArea
          placeholder="Описание"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          placeholder="Заметка"
          type="text"
          name="note"
          onChange={(e) => setNote(e.target.value)}
        />

        <Input
          placeholder="Регион"
          type="text"
          name="region"
          onChange={(e) => setRegion(e.target.value)}
        />

        <Input
          placeholder="Тип местности"
          type="text"
          name="typelocality"
          onChange={(e) => setTypeLocality(e.target.value)}
        />

        <Input
          placeholder="Местность"
          type="text"
          name="locality"
          onChange={(e) => setLocality(e.target.value)}
        />

        <Input
          placeholder="Улица"
          type="text"
          name="street"
          onChange={(e) => setStreet(e.target.value)}
        />

        <Input
          placeholder="Район"
          type="text"
          name="district"
          onChange={(e) => setDistrict(e.target.value)}
        />

        <Input
          placeholder="Дом"
          type="text"
          name="houseNumber"
          onChange={(e) => setHouseNumber(e.target.value)}
        />

        <div className={styles.buttons}>
          <Button type="submit" variant="outlined">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
