import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, DeleteIcon, Player, UpdateIcon } from "@common";
import { FormGeo, Slider } from "@components";

import "swiper/css";
import "swiper/css/navigation";

import {
  useDeleteGeoMutation,
  useGetGeographyQuery,
} from "../../features/geo/geo";

import styles from "./Detail.module.scss";

export const Detail = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { id } = useParams<{ id: any }>();
  const { data: geo, isLoading } = useGetGeographyQuery(id);
  const [deleteGeo, { isLoading: isDeleteGeo }] = useDeleteGeoMutation();

  if (isLoading) return <div>Loading...</div>;
  if (!geo) return <div>Missing geo!</div>;

  const url = geo?.audioList![0];

  console.log(geo, "geo");

  return (
    <div className={styles.detail}>
      <div className={styles.img}>
        <h3 className={styles.title}>{geo.name}</h3>
        <div className={styles.actions}>
          <div className={styles.update}>
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
        <Slider items={geo.photoList} />

        <div className={styles.designation}>
          <div>
            <p>Обозначения</p>
          </div>
          <div className={styles.desc}>
            <p>Широта: {geo.latitude}</p>
            <p>Долгота: {geo.longitude}</p>
            <p>Тип: {geo.type}</p>
          </div>
        </div>

        <Player url={url} />
      </div>

      {!isActive ? <FormGeo geo={geo} /> : null}
    </div>
  );
};
